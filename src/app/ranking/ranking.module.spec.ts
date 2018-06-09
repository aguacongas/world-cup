import { RankingModule } from './ranking.module';

describe('RankingModule', () => {
  let rankingModule: RankingModule;

  beforeEach(() => {
    rankingModule = new RankingModule();
  });

  it('should create an instance', () => {
    expect(rankingModule).toBeTruthy();
  });
});
