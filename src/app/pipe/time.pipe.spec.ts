import { TimePipe } from './time.pipe';
import { TimePipeService } from './time-pipe.service';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe(new TimePipeService());
    expect(pipe).toBeTruthy();
  });
});
