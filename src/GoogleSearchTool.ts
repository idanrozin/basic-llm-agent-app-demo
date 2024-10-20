import axios from 'axios';
import { ToolInterface } from './types';
import dotenv from 'dotenv';
import { GoogleSearchResponse, SearchParams } from './types/GoogleSearchTool';
dotenv.config();
const URL = 'https://serpapi.com/search';

async function _googleSearchResults(params: SearchParams) {
  try {
    const response = await axios.get<GoogleSearchResponse>(URL, { params });
    return response.data.organic_results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function search(query: string): Promise<string> {
  const params: SearchParams = {
    q: query,
    engine: 'google',
    api_key: process.env.SEARCH_API_KEY || '',
  };

  const res = (await _googleSearchResults(params)) as GoogleSearchResponse['organic_results'];

  const snippets: string[] = [];

  if (res.length === 0) {
    return 'No good Google Search Result was found';
  }

  for (const result of res) {
    if (result.snippet) {
      snippets.push(result.snippet);
    }
  }

  return snippets.join(' ');
}

class GoogleSearchTool implements ToolInterface {
  name = 'Google Search';
  description =
    "Get specific information from a search query. Input should be a question like 'How to add number in Clojure?'. Result will be the answer to the question.";

  async use(inputText: string): Promise<string> {
    return search(inputText);
  }
}

export { GoogleSearchTool };
