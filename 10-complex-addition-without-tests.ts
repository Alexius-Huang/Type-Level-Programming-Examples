module ComplexAdditionModule {
    type Cast<T, U> = T extends U ? T : never;

    type NumberToTuple<N extends number | string, Constructed extends Array<any> = []> =
        `${N}` extends `${Constructed['length']}` ? Constructed : NumberToTuple<N, [any, ...Constructed]>;

    type ReverseString<T extends string> =
        T extends `${infer First}${infer Last}` ? `${ReverseString<Last>}${First}` : T;

    type NumberArrayToString<T extends number[]> = T extends [infer Head, ...infer Tail]
        ? `${Cast<Head, number>}${NumberArrayToString<Cast<Tail, number[]>>}`
        : '';

    type StringToNumber<Str extends string> =
        Str extends `${infer Num extends number}` ? Num : never;

    type StringToArrayOfCharacters<S extends string> =
        S extends `${infer Head}${infer Tail}`
            ? [Head, ...StringToArrayOfCharacters<Tail>]
            : [];

    type ArrayOfNumberCharactersToDigits<Arr> =
        Arr extends [infer Head, ...infer Tail]
            ? [
                NumberToTuple<Cast<Head, string>>,
                ...ArrayOfNumberCharactersToDigits<Cast<Tail, string[]>>
            ]
            : [];

    type ToDigits<X extends number | string> =
        ArrayOfNumberCharactersToDigits<StringToArrayOfCharacters<`${X}`>>;

    type Merge<Arr1 extends Array<unknown>, Arr2 extends Array<unknown>> = [...Arr1, ...Arr2];

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
        
    type Map2DArrayToNumber<Arr2D extends unknown[][]> =
        Arr2D extends [infer Head, ...infer Tail]
            ? Head extends unknown[]
            ? Tail extends unknown[][]
            ? [Head['length'], ...Map2DArrayToNumber<Tail>]
            : [] : []
        : [];

    type PossibleSumNumber = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
    type IncrementMap = {
        0:  1,  1:  2,  2:  3,  3:  4,  4:  5,  5:  6,  6:  7,  7:  8,  8:  9, 9: 10,
        10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 15: 16, 16: 17, 17: 18, 18: 19
    };

    type HasTens<Num extends number> = Num extends PossibleSumNumber ? true : false;
    type Increment<Num extends keyof IncrementMap> = IncrementMap[Num];
    type DropTens<Num extends number> = `${Num}` extends `1${infer Digit extends number}` ? Digit : never;
    type Carry<T extends [number, number]> =
        [DropTens<T[0]>, Increment<Cast<T[1], keyof IncrementMap>>];

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

    type CarriedArrayToNumber<Arr extends number[]> =
        ReverseString<NumberArrayToString<Arr>> extends `${infer Result extends number | bigint}`
            ? Result
            : never;

    type Addition<X extends number | bigint, Y extends number | bigint> =
        [ToDigits<ReverseString<`${X}`>>, ToDigits<ReverseString<`${Y}`>>] extends [infer DigitsX, infer DigitsY]
            ? Combine2DArray<Cast<DigitsX, unknown[][]>, Cast<DigitsY, unknown[][]>> extends infer CombinedResult
            ? Map2DArrayToNumber<Cast<CombinedResult, unknown[][]>> extends infer MappedResult
            ? ProcessCarry<Cast<MappedResult, number[]>> extends infer CarriedResult
            ? CarriedArrayToNumber<Cast<CarriedResult, number[]>>
            : typeof NaN : typeof NaN : typeof NaN : typeof NaN;

    type AdditionResult1 = Addition<123, 456>;
    // => 579
    type AdditionResult2 = Addition<99, 901>;
    // => 1000
    type AdditionResult3 = Addition<9999999, 999999>;
    // => 10999998
    type AdditionResult4 = Addition<123456789, 987654321>;
    // => 1111111110
    type AdditionResult5 = Addition<123123456712321289n, 45634563213213212321789n>;
    // => 45634686336669924643078
}
