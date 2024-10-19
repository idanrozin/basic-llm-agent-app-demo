import { ToolInterface } from './types';
import { google } from 'googleapis';

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

async function _googleSearchResults(params: SearchParams) {
  const customSearch = google.customsearch('v1');
  const response = await customSearch.cse.list({
    cx: params.cx,
    q: params.q,
    auth: params.key,
    num: params.num,
  });
  return response.data.items || ([] as SearchResult[]);
}

async function search(query: string): Promise<string> {
  const params: SearchParams = {
    q: query,
    cx: '<Your Custom Search Engine ID>',
    key: '<Your Google API Key>',
    num: 10,
  };

  const res = (await _googleSearchResults(params)) as SearchResult[];
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
