export interface ToolInterface {
  name: string;
  description: string;
  use(inputText: string): Promise<string>;
}

export interface ChatLLMGeneratePayload {
  messages: Message[];
  // documents?: Document[],
  // tools?: Tool[],
  maxTokens?: number;
  stop?: string[];
  n?: number;
  topP?: number;
  responseFormat?: { type: string };
}

interface Message {
  role: string;
  content: string;
}

// interface Document {
//   // Define the structure of a document if needed
// }

// interface Tool {
//   // Define the structure of a tool if needed
// }

export interface AI21ChatResponse {
  // Define the structure of the AI21 chat response
  // This is a placeholder and should be updated based on the actual response structure
  output: string;
}
