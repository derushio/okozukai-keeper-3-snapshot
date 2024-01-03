import _ from 'lodash';

export function separate() {
  console.info(
    _.range(10)
      .map(() => '-')
      .join(''),
  );
}
