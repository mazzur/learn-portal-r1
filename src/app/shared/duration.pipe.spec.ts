import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const expectedTransforms: Array<[number, string]> = [
    [12, '12min'],
    [120, '2h'],
    [161, '2h 41min']
  ];

  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  expectedTransforms.forEach(
    ([rawValue, expected]) => it(`should transform ${rawValue} into ${expected}`, () => {
      expect(pipe.transform(rawValue)).toEqual(expected);
    })
  );
});
