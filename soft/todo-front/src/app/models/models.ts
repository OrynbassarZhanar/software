export interface Competition {
  id: number;
  name: string;
}

export interface Member {
  id: number;
  name: string;
  competition: Competition;
  status: string;
  created_at: Date;
  due_on: Date;
}

export interface Token {
  token: string;
}
