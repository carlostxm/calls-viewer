export interface User {
  token: string;
  name: string;
}

export interface Note {
  id: string;
  content: string;
}

interface CallMandatoryFields {
  id: string;
  isArchived: boolean;
  notes: Note[];
  createdAt: string;
  from: string;
  to: string;
  duration: number;
  via: string;
  callType: string;
}

export type Call = CallMandatoryFields & Record<string, unknown>;

export interface CallsPage {
  callsByDate: Map<string, Call[]>;
  totalCount: number;
  hasNextPage: boolean;
}
