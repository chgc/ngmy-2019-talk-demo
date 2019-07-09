export interface WikiSearchResult {
  batchcomplete: string;
  continue: Continue;
  query: Query;
}

export interface Query {
  searchinfo: Searchinfo;
  search: Search[];
}

export interface Search {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

interface Searchinfo {
  totalhits: number;
}

interface Continue {
  sroffset: number;
  continue: string;
}
