export interface SearchParams {
  q: string;
  engine: string;
  api_key: string;
}

export interface GoogleSearchResponse {
  search_metadata: {
    id: string;
    status: string;
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    google_url: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters: {
    engine: string;
    q: string;
    location_requested: string;
    location_used: string;
    google_domain: string;
    hl: string;
    gl: string;
    device: string;
  };
  search_information: {
    organic_results_state: string;
    query_displayed: string;
    total_results: number;
    time_taken_displayed: number;
  };
  recipes_results: Array<{
    title: string;
    link: string;
    source: string;
    total_time: string;
    ingredients: string[];
    thumbnail: string;
  }>;
  local_map: {
    link: string;
    image: string;
    gps_coordinates: {
      latitude: number;
      longitude: number;
      altitude: number;
    };
  };
  local_results: {
    more_locations_link: string;
    places: Array<{
      position: number;
      title: string;
      place_id: string;
      lsig: string;
      place_id_search: string;
      reviews?: number;
      price?: string;
      type: string;
      address: string;
      thumbnail: string;
      gps_coordinates: {
        latitude: number;
        longitude: number;
      };
    }>;
  };
  knowledge_graph: {
    title: string;
    type: string;
    header_images: Array<{
      image: string;
      source: string;
    }>;
    description: string;
    source: {
      name: string;
      link: string;
    };
    patron_saint?: string;
    patron_saint_links?: Array<{
      patron_saint_text: string;
      patron_saint_link: string;
    }>;
    chicory_coffee?: Array<{
      name: string;
      link: string;
      image: string;
    }>;
    chicory_coffee_link?: string;
    chicory_coffee_stick?: string;
    coffee_books?: Array<{
      name: string;
      link: string;
      image: string;
    }>;
    coffee_books_link?: string;
    coffee_books_stick?: string;
    people_also_search_for?: Array<{
      name: string;
      link: string;
      image: string;
    }>;
    people_also_search_for_link?: string;
    people_also_search_for_stick?: string;
    see_results_about?: Array<{
      name: string;
      extensions?: string[];
      image?: string;
    }>;
    list?: {
      [key: string]: string[];
    };
  };
  related_questions?: Array<{
    question: string;
    snippet: string;
    title: string;
    link: string;
    displayed_link: string;
  }>;
  organic_results: Array<{
    position: number;
    title: string;
    link: string;
    displayed_link: string;
    snippet: string;
    sitelinks?: {
      inline?: Array<{
        title: string;
        link: string;
      }>;
    };
    rich_snippet?: {
      top?: {
        detected_extensions?: {
          [key: string]: number;
        };
        extensions?: string[];
      };
      bottom?: {
        extensions?: string[];
        detected_extensions?: {
          [key: string]: number;
        };
      };
    };
    about_this_result?: {
      source: {
        description: string;
        source_info_link: string;
        security: string;
        icon?: string;
      };
      keywords: string[];
      related_keywords?: string[];
      languages: string[];
      regions: string[];
    };
    cached_page_link?: string;
    related_pages_link?: string;
    related_results?: Array<{
      position: number;
      title: string;
      link: string;
      displayed_link: string;
      snippet: string;
      about_this_result?: {
        source: {
          description: string;
          source_info_link: string;
          security: string;
        };
        keywords: string[];
        languages: string[];
        regions: string[];
      };
      cached_page_link?: string;
    }>;
  }>;
  related_searches: Array<{
    block_position: number;
    query: string;
    items?: Array<{
      name: string;
      image?: string;
      link: string;
      serpapi_link: string;
    }>;
    link: string;
    serpapi_link: string;
  }>;
  pagination: {
    current: number;
    next: string;
    other_pages: {
      [key: number]: string;
    };
  };
  serpapi_pagination: {
    current: number;
    next_link: string;
    next: string;
    other_pages: {
      [key: number]: string;
    };
  };
}
