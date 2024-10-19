import assert from 'assert';
import Agent from './Agent';
import { ChatLLM } from './ChatLLM';
import { GoogleSearchTool } from './GoogleSearchTool';
import { TypescriptCodeRunnerTool } from './playground';

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
  const result = await agent.run('Which move generated more money, avengers 1 or 2?');
  console.log(result);
}
// Playground example
async function playground() {
  const pythonREPL = new TypescriptCodeRunnerTool();
  const result = await pythonREPL.use('console.log(5*7)');

  console.log('result:', result);
  const errorMessage = 'result should be 35';
  // assert that the result is 35
  assert(result === '35\n', errorMessage);
}

// Playground with agent example
async function playgroundWithAgent() {
  const agent = new Agent(new ChatLLM(), [new GoogleSearchTool(), new TypescriptCodeRunnerTool()]);
  const result = await agent.run(
    'Find me the cost of fuel of flying between tel aviv to houston in ILS, use TypeScript',
  );
  console.log('Final answer is:', result);
}

// googleSearch();
// chatLLM();
// runAgent();
// playground();
// playgroundWithAgent();
