import axios from 'axios';

interface Message {
  role: string;
  content: string;
}

interface AI21Response {
  completions: Array<{
    data: {
      text: string;
    };
  }>;
}

export class ChatLLM {
  private model = 'j2-jumbo-instruct';
  private temperature = 0.0;
  private apiKey: string;

  constructor(apiKey: string, model?: string, temperature?: number) {
    this.apiKey = apiKey;
    if (model) this.model = model;
    if (temperature !== undefined) this.temperature = temperature;
  }

  async generate(messages: Message[], stop?: string[]): Promise<string> {
    const url = `https://api.ai21.com/studio/v1/${this.model}/complete`;

    // Convert messages array to a single prompt string
    // const prompt = messages.map((msg) => `${msg.role}: ${msg.content}`).join('\n');

    try {
      const response = await axios.post<AI21Response>(
        url,
        {
          messages,
          temperature: this.temperature,
          stopSequences: stop,
          maxTokens: 200, // You may want to adjust this
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.completions[0].data.text;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }
}
