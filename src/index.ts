import { ChatLLM } from './ChatLLM';
import { GoogleSearchTool } from './GoogleSearchTool';
// import { ToolInterface } from './types';

function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet('TypeScript'));

/* abstract class ToolBase implements ToolInterface {
  constructor(public name: string, public description: string) {}

  abstract use(inputText: string): Promise<string>;
}

class Tool extends ToolBase {
  constructor(name: string, description: string) {
    super(name, description);
  }

  use(inputText: string): Promise<string> {
    return Promise.resolve(`Using ${this.name}: ${inputText}`);
  }
}

const tool = new Tool('Tool', 'This is a tool');
console.log(tool.use('Hello, world!')); */

const googleSearchTool = new GoogleSearchTool();
console.log(googleSearchTool.use('Who is amit mandelbaum?'));

const llm = new ChatLLM();
const result = llm.generate({
  messages: [{ role: 'user', content: 'Who is the president of the USA?' }],
});
console.log(result);
