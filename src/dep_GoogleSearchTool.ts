import axios from 'axios';
import { ToolInterface } from './types';

interface SearchParams {
  q: string;
  cx: string;
  key: string;
  num: number;
}

interface SearchResult {
  snippet?: string;
  [key: string]: unknown;
}

async function _googleSearchResults(params: SearchParams): Promise<SearchResult[]> {
  const url = 'https://www.googleapis.com/customsearch/v1';
  const response = await axios.get(url, { params });
  return response.data.items || [];
}

async function search(query: string): Promise<string> {
  const params: SearchParams = {
    q: query,
    cx: '<Your Custom Search Engine ID>',
    key: '<Your Google API Key>',
    num: 10,
  };

  const res = await _googleSearchResults(params);
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

class dep_GoogleSearchTool implements ToolInterface {
  name = 'Google Search';
  description =
    "Get specific information from a search query. Input should be a question like 'How to add number in Clojure?'. Result will be the answer to the question.";

  async use(inputText: string): Promise<string> {
    return search(inputText);
  }
}

export { dep_GoogleSearchTool };
