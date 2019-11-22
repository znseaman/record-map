import { compose, findIndex, prop, propEq } from 'ramda';

// (Object, Array) => Integer
export const findIndexById = compose(
  findIndex,
  propEq('id'),
  prop('id')
)