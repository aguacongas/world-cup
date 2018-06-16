export interface TeamName {
  Locale: string;
  Description: string;
}

export interface Team {
  Score: number;
  TeamName: TeamName[];
}

export interface Result {
  HomeTeamPenaltyScore: number;
  AwayTeamPenaltyScore: number;
  HomeTeam: Team;
  AwayTeam: Team;
  MatchStatus: number;
}

export interface RootObject {
  ContinuationToken?: any;
  ContinuationHash?: any;
  Results: Result[];
}
