import assert from 'assert';
import Agent from './Agent';
import { ChatLLM } from './ChatLLM';
import { GoogleSearchTool } from './GoogleSearchTool';
import { JavascriptCodeRunnerTool } from './CodeRunner';

// llm example
// docs: https://docs.ai21.com/reference/jamba-15-api-ref
// api key: https://studio.ai21.com/
async function chatLLM() {
  const llm = new ChatLLM();
  const llmResult = await llm.generate({
    messages: [{ role: 'user', content: 'Who is the president of the USA?' }],
  });
  console.log(llmResult);
}

// google search tool example
// https://serpapi.com/
async function googleSearch() {
  const googleSearchTool = new GoogleSearchTool();
  const result = await googleSearchTool.use('What is the weather today in Tokyo?');
  console.log(result);
}

// ReAct agent example
async function runAgent() {
  const agent = new Agent(new ChatLLM(), [new GoogleSearchTool()]);
  const result = await agent.run(
    'how much money did the Titanic movie generate? how much money did the avatar movie generate? and who generated more money?',
  );
  console.log(result);
}

// code runner example
async function coding() {
  const runner = new JavascriptCodeRunnerTool();
  const result = await runner.use('console.log(5*7)');

  console.log('result:', result);
  const errorMessage = 'result should be 35';
  // assert that the result is 35
  assert(result === '35\n', errorMessage);
}

// multi tool with agent, google search and code runner example
async function multiTool() {
  const agent = new Agent(new ChatLLM(), [new GoogleSearchTool(), new JavascriptCodeRunnerTool()]);
  const result = await agent.run(
    'Find total cost of coffee consumption in a year in London. Search for average coffee price, typical consumption per day, and use JavaScript to calculate yearly expense in GBP including weekends vs weekdays',
  );
  console.log('Final answer is:', result);
}

const functionMap: { [key: string]: () => Promise<void> } = {
  googleSearch,
  chatLLM,
  runAgent,
  coding,
  multiTool,
};

const functionName = process.argv[2];

if (functionName && functionName in functionMap) {
  functionMap[functionName]();
} else {
  console.log(
    'Please specify a valid function name: googleSearch, chatLLM, runAgent, coding, multiTool',
  );
  process.exit(1);
}
