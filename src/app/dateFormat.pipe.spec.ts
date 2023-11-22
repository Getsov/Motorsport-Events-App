import { dateFormatPipe } from './dateFormat.pipe';

describe('dateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new dateFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
