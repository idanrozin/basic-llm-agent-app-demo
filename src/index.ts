import Agent from './Agent';
import { ChatLLM } from './ChatLLM';
import { GoogleSearchTool } from './GoogleSearchTool';

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

// googleSearch();
// chatLLM();
runAgent();
