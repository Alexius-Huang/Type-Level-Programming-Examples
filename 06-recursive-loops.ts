module RecursiveLoops_06 {
    type DeepElementTypeOfArray<T> =
        T extends Array<infer ElementType>
            ? DeepElementTypeOfArray<ElementType>
            : T;

    type EX1 = DeepElementTypeOfArray<number[][][]>;
    // => number

    type Split<
        Str extends string,
        Separator extends string
    > =
        Str extends `${infer Head}${Separator}${infer Tail}`
            ? [Head, ...Split<Tail, Separator>]
            : [Str];

    type EX2 = Split<'Hello World', ' '>;
    // => ['Hello', 'World']

    type EX3 = Split<'Hello World', 'o'>;
    // => ['Hell', 'W', 'rld']

    type Includes<Arr extends Array<any>, Element> =
        Arr extends [infer Head, ...infer Tail]
            ? (Element extends Head ? true : Includes<Tail, Element>)
            : false;

    type Example = [1, '2', 'Hello', 4, true];
    type Result1 = Includes<Example, 1>;       // => true
    type Result2 = Includes<Example, 2>;       // => false
    type Result3 = Includes<Example, 'Hello'>; // => true
    type Result4 = Includes<Example, 'World'>; // => false
    type Result5 = Includes<Example, true>;    // => true
    type Result6 = Includes<Example, false>;   // => false
}
