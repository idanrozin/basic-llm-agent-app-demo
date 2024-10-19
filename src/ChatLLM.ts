import axios from 'axios';
import dotenv from 'dotenv';
import { AI21ChatResponse, ChatLLMGeneratePayload } from './types';

dotenv.config();

export class ChatLLM {
  private model = 'jamba-1.5-large';
  private temperature = 0.4;
  private apiKey: string;

  constructor(apiKey?: string, model?: string, temperature?: number) {
    this.apiKey = apiKey || process.env.AI21_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('AI21 API key is not set');
    }
    if (model) this.model = model;
    if (temperature !== undefined) this.temperature = temperature;
  }

  async generate({
    messages,
    // documents?: Document[],
    // tools?: Tool[],
    maxTokens = 2048,
    stop = [],
    n = 1,
    topP = 1,
    responseFormat = { type: 'text' },
  }: ChatLLMGeneratePayload): Promise<string> {
    const url = 'https://api.ai21.com/studio/v1/chat/completions';

    try {
      const response = await axios.post<AI21ChatResponse>(
        url,
        {
          model: this.model,
          messages,
          // documents,
          // tools,
          n,
          max_tokens: maxTokens,
          temperature: this.temperature,
          top_p: topP,
          stop,
          response_format: responseFormat,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Assuming the response structure. Adjust this based on the actual AI21 chat API response
      return response.data.output;
    } catch (error) {
      console.error('Error generating chat completion:', error);
      throw error;
    }
  }
}
