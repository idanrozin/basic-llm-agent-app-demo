import { ChatLLM } from './ChatLLM'; // Assuming you have this interface defined
import { ToolInterface } from './types'; // Assuming you have this interface defined

const FINAL_ANSWER_TOKEN = 'Final Answer:';
const OBSERVATION_TOKEN = 'Observation:';
const THOUGHT_TOKEN = 'Thought:';
const PROMPT_TEMPLATE = `Today is {today} and you can use tools to get new information. Answer the question as best as you can using the following tools:

{tool_description}

Use the following format:

Question: the input question you must answer
Thought: comment on what you want to do next
Action: the action to take, exactly one element of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation repeats N times, use it until you are sure of the answer)
Thought: I now know the final answer
Final Answer: your final answer to the original input question

Begin!

Question: {question}
Thought: {previous_responses}
`;

class Agent {
  private llm: ChatLLM;
  private tools: ToolInterface[];
  private promptTemplate: string;
  private maxLoops: number;
  private stopPattern: string[];

  constructor(
    llm: ChatLLM,
    tools: ToolInterface[],
    promptTemplate: string = PROMPT_TEMPLATE,
    maxLoops = 15,
    // The stop pattern is used, so the LLM does not hallucinate until the end
    stopPattern: string[] = [`\n${OBSERVATION_TOKEN}`, `\n\t${OBSERVATION_TOKEN}`],
  ) {
    this.llm = llm;
    this.tools = tools;
    this.promptTemplate = promptTemplate;
    this.maxLoops = maxLoops;
    this.stopPattern = stopPattern;
  }

  private get toolDescription(): string {
    return this.tools.map((tool) => `${tool.name}: ${tool.description}`).join('\n');
  }

  private get toolNames(): string {
    return this.tools.map((tool) => tool.name).join(',');
  }

  private get toolByNames(): { [key: string]: ToolInterface } {
    return Object.fromEntries(this.tools.map((tool) => [tool.name, tool]));
  }

  async run(question: string): Promise<string> {
    const previousResponses: string[] = [];
    let numLoops = 0;
    const prompt = this.promptTemplate
      .replace('{today}', new Date().toISOString().split('T')[0])
      .replace('{tool_description}', this.toolDescription)
      .replace('{tool_names}', this.toolNames)
      .replace('{question}', question)
      .replace('{previous_responses}', '{previous_responses}');

    console.log(prompt.replace('{previous_responses}', ''));

    while (numLoops < this.maxLoops) {
      numLoops++;
      const currPrompt = prompt.replace('{previous_responses}', previousResponses.join('\n'));
      const [generated, tool, toolInput] = await this.decideNextAction(
        currPrompt.replace('\nThought:\n', '').replace('\nThought: \n', ''),
      );

      if (tool === 'Final Answer') {
        return toolInput;
      }

      if (!(tool in this.toolByNames)) {
        throw new Error(`Unknown tool: ${tool}`);
      }

      const toolResult = await this.toolByNames[tool].use(toolInput);
      const updatedGenerated = `${generated}\n${OBSERVATION_TOKEN} ${toolResult}\n${THOUGHT_TOKEN}`;
      console.log(updatedGenerated);
      previousResponses.push(updatedGenerated);
    }

    throw new Error('Max loops reached without final answer');
  }

  private async decideNextAction(_prompt: string): Promise<[string, string, string]> {
    const generated = await this.llm.generate({
      messages: [{ role: 'user', content: _prompt }],
      stop: this.stopPattern,
    });
    const [tool, toolInput] = this.parse(generated);
    return [generated, tool, toolInput];
  }

  private parse(generated: string): [string, string] {
    if (generated.includes(FINAL_ANSWER_TOKEN)) {
      return ['Final Answer', (generated.split(FINAL_ANSWER_TOKEN).pop() as string).trim()];
    }

    const regex = /Action: [\\[]?(.*?)[\]]?[\n]*Action Input:[\s]*(.*)/s;
    const match = generated.match(regex);

    if (!match) {
      throw new Error(`Output of LLM is not parsable for next tool use: \`${generated}\``);
    }

    const tool = match[1].trim();
    const toolInput = match[2].trim().replace(/^"(.*)"$/, '$1');
    return [tool, toolInput];
  }
}

export default Agent;
