import { compose, findIndex, prop, propEq, map, indexOf } from 'ramda';

// (Object, Array) => Integer
export const findIndexById = compose(
  findIndex,
  propEq('id'),
  prop('id')
)

// ([Object], [Object])
export const concatById = (arr1, arr2) => {
  // don't allow for side effects outside of function
  const localArr1 = [...arr1];
  const localArr2 = [...arr2];

  // get all ids from arr1
  const keys = map(prop('id'), localArr1);

  localArr2.forEach(f => {
    const index = indexOf(f.id, keys);
    if (index != -1) {
      localArr1[index] = f;
    }
  });

  return localArr1;
}