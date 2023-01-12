module AdditionModule {
    type Expect<T extends true> = T extends any ? true : false;
    type Equality<T, U> = T extends U ? true : false;
    type MatchArray<T, U> = T extends [infer Head, ...infer Tail]
        ? U extends [infer CompareHead, ...infer CompareTail]
            ? Head extends CompareHead
                ? MatchArray<Tail, CompareTail>
                : false
            : false
        : true;
    type Cast<T, U> = T extends U ? T : never;

    type NumberToTuple<N extends number | string, Constructed extends Array<any> = []> =
        `${N}` extends `${Constructed['length']}`
            ? Constructed
            : NumberToTuple<N, [any, ...Constructed]>;
    type NumberToTupleTest = Expect<Equality<
        NumberToTuple<5>,
        [any, any, any, any, any]
    >>;

    type ReverseString<T extends string> =
        T extends `${infer First}${infer Last}`
            ? `${ReverseString<Last>}${First}`
            : T;
    type ReverseStringTest = Expect<Equality<
        ReverseString<"Hello">,
        "olleH"
    >>;

    type NumberArrayToString<T extends number[]> = T extends [infer Head, ...infer Tail]
        ? `${Cast<Head, number>}${NumberArrayToString<Cast<Tail, number[]>>}`
        : '';
    type NumberArrayToStringTest1 = Expect<Equality<
        NumberArrayToString<[1, 2, 3]>,
        '123'
    >>;
    type NumberArrayToStringTest2 = Expect<Equality<
        NumberArrayToString<[2, 3, 1, 0, 9]>,
        '23109'
    >>;

    type StringToNumber<Str extends string> = Str extends `${infer Num extends number}`
        ? Num
        : never;
    type StringToNumberTest1 = Expect<Equality<
        StringToNumber<'123'>,
        123
    >>;
    type StringToNumberTest2 = Expect<Equality<
        StringToNumber<'90123'>,
        90123
    >>;

    type StringToArrayOfCharacters<S extends string> =
        S extends `${infer Head}${infer Tail}`
            ? [Head, ...StringToArrayOfCharacters<Tail>]
            : [];
    type StringToArrayOfCharactersTest = Expect<Equality<
        StringToArrayOfCharacters<"Hello">,
        ["H", "e", "l", "l", "o"]
    >>;

    type ArrayOfNumberCharactersToDigits<Arr> =
        Arr extends [infer Head, ...infer Tail]
            ? [
                NumberToTuple<Cast<Head, string>>,
                ...ArrayOfNumberCharactersToDigits<Cast<Tail, string[]>>
            ]
            : [];
    type ArrayOfNumberCharactersToDigitsTest = Expect<Equality<
        ArrayOfNumberCharactersToDigits<["1", "2", "3"]>,
        [[any], [any, any], [any, any, any]]
    >>;

    type ToDigits<X extends number | string> =
        ArrayOfNumberCharactersToDigits<
            StringToArrayOfCharacters<`${X}`>
        >;

    type ToDigitsTest = Expect<Equality<
        ToDigits<123>,
        [[any], [any, any], [any, any, any]]
    >>;

    type Merge<Arr1 extends Array<unknown>, Arr2 extends Array<unknown>> =
        [...Arr1, ...Arr2];
    type MergeTest = Expect<Equality<
        Merge<[1, 2, 3], ['a', 'b', 'c']>,
        [1, 2, 3, 'a', 'b', 'c']
    >>;

    type Combine2DArray<Arr1 extends unknown[][], Arr2 extends unknown[][]> =
        Arr1 extends [infer Head1, ...infer Tail1]
            ? Arr2 extends [infer Head2, ...infer Tail2]
                ? [
                    Merge<
                        Cast<Head1, unknown[]>,
                        Cast<Head2, unknown[]>
                    >, ...Combine2DArray<
                        Cast<Tail1, unknown[][]>,
                        Cast<Tail2, unknown[][]>
                    >]
                : [Head1, ...Tail1]
            : (Arr2 extends unknown[][] ? Arr2 : []);
    type Combine2DArrayTest = Expect<Equality<
        Combine2DArray<[
            [1], [1, 2], ['a', 'b']
        ], [
            ['a', 'b'], ['c'], [1, 2, 'c']
        ]>,
        [[1, 'a', 'b'], [1, 2, 'c'], ['a', 'b', 1, 2, 'c']]
    >>;
    type Combine2DArrayTest2 = Expect<Equality<
        Combine2DArray<[
            [1], [1, 2], ['a', 'b'], ['d'], ['e', 'f']
        ], [
            ['a', 'b'], ['c'], [1, 2, 'c']
        ]>,
        [[1, 'a', 'b'], [1, 2, 'c'], ['a', 'b', 1, 2, 'c'], ['d'], ['e', 'f']]
    >>;
    type Combine2DArrayTest3 = Expect<Equality<
        Combine2DArray<[
            [1], [1, 2], ['a', 'b']
        ], [
            ['a', 'b'], ['c'], [1, 2, 'c'], ['d'], ['e', 'f']
        ]>,
        [[1, 'a', 'b'], [1, 2, 'c'], ['a', 'b', 1, 2, 'c'], ['d'], ['e', 'f']]
    >>;
        
    type Map2DArrayToNumber<Arr2D extends unknown[][]> =
        Arr2D extends [infer Head, ...infer Tail]
            ? Head extends unknown[]
            ? Tail extends unknown[][]
            ? [Head['length'], ...Map2DArrayToNumber<Tail>]
            : [] : []
        : [];
    type Map2DArrayToNumberTest = Expect<Equality<
        Map2DArrayToNumber<[
            [any, any, any],
            [1, 2, 3, 4, 5],
            ['a', 'b'],
            ['a', true, false, any, unknown, undefined]
        ]>,
        [3, 5, 2, 6]
    >>;

    type PossibleSumNumber = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
    type IncrementMap = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 11,
        11: 12,
        12: 13,
        13: 14,
        14: 15,
        15: 16,
        16: 17,
        17: 18,
        18: 19
    };

    type HasTens<Num extends number> = Num extends PossibleSumNumber ? true : false;
    type HasTensTest1 = Expect<Equality<HasTens<12>, true>>;
    type HasTensTest2 = Expect<Equality<HasTens<1>, false>>;

    type Increment<Num extends keyof IncrementMap> = IncrementMap[Num];
    type IncrementTest1 = Expect<Equality<Increment<11>, 12>>;
    type IncrementTest2 = Expect<Equality<Increment<18>, 19>>;

    type DropTens<Num extends number> = `${Num}` extends `1${infer Digit extends number}` ? Digit : never;
    type DropTensTest1 = Expect<Equality<DropTens<18>, 8>>;
    type DropTensTest2 = Expect<Equality<DropTens<11>, 1>>;

    type Carry<T extends [number, number]> =
        [DropTens<T[0]>, Increment<Cast<T[1], keyof IncrementMap>>];
    type CarryTest1 = Expect<Equality<Carry<[11, 2]>, [1, 3]>>;
    type CarryTest2 = Expect<Equality<Carry<[18, 18]>, [8, 19]>>;

    type ProcessCarry<Arr extends number[]> =
        Arr extends [infer Target, infer Next, ...infer Tail]
            ? HasTens<Cast<Target, number>> extends true
                ? Carry<Cast<[Target, Next], [number, number]>> extends [infer Result1, infer Result2] 
                    ? [Result1, ...ProcessCarry<Cast<[Result2, ...Tail], number[]>>]
                    : never
                : [Target, ...ProcessCarry<Cast<[Next, ...Tail], number[]>>]
            : Arr extends [infer Target, infer Next]
                ? HasTens<Cast<Target, number>> extends true
                    ? Carry<Cast<[Target, Next], [number, number]>>
                    : never
            : Arr extends [infer Target]
                ? HasTens<Cast<Target, number>> extends true
                    ? Carry<Cast<[Target, 0], [number, number]>>
                    : [Target]
                : never;

    type ProcessCarryTest1 = Expect<MatchArray<
        ProcessCarry<[11, 12, 3]>,
        [1, 3, 4]
    >>;
    type ProcessCarryTest2 = Expect<MatchArray<
        ProcessCarry<[18, 18]>,
        [8, 9, 1]
    >>;
    type ProcessCarryTest3 = Expect<MatchArray<
        ProcessCarry<[10, 9, 8]>,
        [0, 0, 9]
    >>;

    type CarriedArrayToNumber<Arr extends number[]> =
        ReverseString<NumberArrayToString<Arr>> extends `${infer Result extends number | bigint}`
            ? Result
            : never;
    type CarriedArrayToNumberTest = Expect<Equality<
        CarriedArrayToNumber<[1, 2, 3]>,
        321
    >>;

    type Addition<X extends number | bigint, Y extends number | bigint> =
        [ToDigits<ReverseString<`${X}`>>, ToDigits<ReverseString<`${Y}`>>] extends [infer DigitsX, infer DigitsY]
            ? Combine2DArray<
                Cast<DigitsX, unknown[][]>,
                Cast<DigitsY, unknown[][]>
            > extends infer CombinedResult
            ? Map2DArrayToNumber<Cast<CombinedResult, unknown[][]>> extends infer MappedResult
            ? ProcessCarry<Cast<MappedResult, number[]>> extends infer CarriedResult
            ? CarriedArrayToNumber<Cast<CarriedResult, number[]>>
            : typeof NaN : typeof NaN : typeof NaN : typeof NaN;

    type AdditionTest1 = Expect<Equality<
        Addition<123, 456>,
        579
    >>;
    type AdditionTest2 = Expect<Equality<
        Addition<99, 901>,
        1000
    >>;
    type AdditionTest3 = Expect<Equality<
        Addition<9999999, 999999>,
        10999998
    >>;
    type AdditionTest4 = Expect<Equality<
        Addition<123456789, 987654321>,
        1111111110
    >>;
    type AdditionTest5 = Expect<Equality<
        Addition<123456789123456789n, 987654321987654321n>,
        1111111111111111110n
    >>;
}
