export interface ToolInterface {
  name: string;
  description: string;
  use(inputText: string): Promise<string>;
}
