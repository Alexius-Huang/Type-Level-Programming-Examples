type Zip<Arr1, Arr2> =
    Arr1 extends [infer Head1, ...infer Rest1]
        ? Arr2 extends [infer Head2, ...infer Rest2]
            ? [[Head1, Head2], ...Zip<Rest1, Rest2>]
            : []
        : [];

type Result = Zip<[1, 2, 3], ['a', 'b', 'c']>;
// => [[1, 'a'], [2, 'b'], [3, 'c']]