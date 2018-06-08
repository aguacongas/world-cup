import { TeamModule } from './team.module';

describe('TeamModule', () => {
  let teamModule: TeamModule;

  beforeEach(() => {
    teamModule = new TeamModule();
  });

  it('should create an instance', () => {
    expect(teamModule).toBeTruthy();
  });
});
