module Generics_01 {
    type Push<T, Arr extends Array<unknown>> = [T, ...Arr];
    type EX1 = Push<1, [2, 3, 4]>;
    // => [1, 2, 3, 4]

    type Merge<
        Arr1 extends Array<unknown>,
        Arr2 extends Array<unknown>
    > = [...Arr1, ...Arr2];
    type EX2 = Merge<[1, 2, 3], ['a', 'b', 'c']>;
    // => [1, 2, 3, 'a', 'b', 'c']
}
