import { Match } from './../../model/match';
import { Bet } from '../../model/bet';

export interface UserBet {
  bet: Bet;
  match: Match;
  info: string;
  point: number;
}
