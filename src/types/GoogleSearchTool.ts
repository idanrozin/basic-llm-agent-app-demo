export interface SearchParams {
  q: string;
  engine: string;
  api_key: string;
}

export type SearchResult = {
  search_metadata: {
    id: string;
    status: string;
    created_at: string;
    request_time_taken: number;
    parsing_time_taken: number;
    total_time_taken: number;
    request_url: string;
    html_url: string;
    json_url: string;
  };
  search_parameters: {
    engine: string;
    q: string;
    google_domain: string;
    hl: string;
    gl: string;
  };
  search_information: {
    query_displayed: string;
    total_results: number;
    time_taken_displayed: number;
    detected_location: string;
  };
  knowledge_graph?: {
    kgmid: string;
    knowledge_graph_type: string;
    title: string;
    type: string;
    description: string;
    source: {
      name: string;
      link: string;
    };
    initial_release_date: string;
    developers: string;
    developers_links: {
      text: string;
      link: string;
    }[];
    engine: string;
    license: string;
    platform: string;
    stable_release: string;
    written_in: string;
    written_in_links: {
      text: string;
      link: string;
    }[];
    people_also_search_for: {
      name: string;
      link: string;
      image: string;
    }[];
    image: string;
  };
  organic_results: {
    position: number;
    title: string;
    link: string;
    domain: string;
    displayed_link: string;
    snippet: string;
    snippet_highlighted_words: string[];
    date?: string;
    about_this_result?: {
      source: {
        description: string;
        favicon?: string;
        name?: string;
        type?: string;
        link_source?: string;
        link?: string;
      };
    };
    about_page_link: string;
    cached_page_link: string;
    favicon: string;
    thumbnail?: string;
  }[];
  related_questions: {
    question: string;
    answer: string;
    answer_highlight: string;
    source: {
      title: string;
      link: string;
      domain: string;
      displayed_link: string;
      favicon: string;
    };
    search: {
      title: string;
      link: string;
    };
  }[];
  related_searches: {
    query: string;
    link: string;
  }[];
  pagination: {
    current: number;
    next: string;
  };
};
