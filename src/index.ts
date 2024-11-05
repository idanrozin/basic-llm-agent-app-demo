import assert from 'assert';
import Agent from './Agent';
import { ChatLLM } from './ChatLLM';
import { GoogleSearchTool } from './GoogleSearchTool';
import { JavascriptCodeRunnerTool } from './CodeRunner';

// google search tool example
async function googleSearch() {
  const googleSearchTool = new GoogleSearchTool();
  const result = await googleSearchTool.use('Who is amit mandelbaum?');
  console.log(result);
}

// llm example
async function chatLLM() {
  const llm = new ChatLLM();
  const llmResult = await llm.generate({
    messages: [{ role: 'user', content: 'Who is the president of the USA?' }],
  });
  console.log(llmResult);
}

// ReAct agent example
async function runAgent() {
  const agent = new Agent(new ChatLLM(), [new GoogleSearchTool()]);
  const result = await agent.run(
    'Which move generated more money, avengers 1 or 2? and how much each one has generated?',
  );
  console.log(result);
}

// Playground example
async function playground() {
  const REPL = new JavascriptCodeRunnerTool();
  const result = await REPL.use('console.log(5*7)');

  console.log('result:', result);
  const errorMessage = 'result should be 35';
  // assert that the result is 35
  assert(result === '35\n', errorMessage);
}

// Playground with agent example
async function playgroundWithAgent() {
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
  playground,
  playgroundWithAgent,
};

const functionName = process.argv[2];

if (functionName && functionName in functionMap) {
  functionMap[functionName]();
} else {
  console.log(
    'Please specify a valid function name: googleSearch, chatLLM, runAgent, playground, playgroundWithAgent',
  );
  process.exit(1);
}
