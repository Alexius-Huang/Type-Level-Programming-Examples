module ExcludeNthElementModule {
type ExcludeNthElement<Arr extends Array<any>, Index extends number> =
    Arr['length'] extends Index
        ? Arr extends [...infer Rest, infer _]
            ? Rest : Arr
        : Arr extends [...infer Rest, infer Last]
            ? [...ExcludeNthElement<Rest, Index>, Last]
            : Arr;

type Result1 = ExcludeNthElement<[1, 2, 3], 2>; // => [1, 3]
type Result2 = ExcludeNthElement<[1, 2, 3], 1>; // => [2, 3]
type Result3 = ExcludeNthElement<[1, 2, 3], 3>; // => [1, 2]
type Result4 = ExcludeNthElement<[1, 2, 3], 4>; // => [1, 2, 3]
type Result5 = ExcludeNthElement<[1, 2, 3], 0>; // => [1, 2, 3]
type Result6 = ExcludeNthElement<[], 0>;        // => []
}

