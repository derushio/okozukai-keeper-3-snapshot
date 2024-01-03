import { wait } from '^/utils/wait';
import { differenceInMilliseconds } from 'date-fns';
import _ from 'lodash';
import { expect, test } from 'vitest';

test('wait関数 精度', async () => {
  const waitMillisec = 5000;
  const start = new Date();
  await wait(waitMillisec);
  const end = new Date();

  /** 許容精度 */
  const errorRatio = waitMillisec * 0.05;
  expect(
    _.inRange(
      differenceInMilliseconds(end, start) - waitMillisec,
      -errorRatio,
      errorRatio,
    ),
    '精度内に収まっているか',
  ).toBe(true);
});
