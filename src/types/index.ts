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

export interface AI21ChatResponse {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      tool_calls?: Array<{
        id: string;
        type: string;
        function: {
          name: string;
          arguments: Record<string, unknown>;
        };
      }> | null;
    };
    finish_reason: 'stop' | 'length';
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
