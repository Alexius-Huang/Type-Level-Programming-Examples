module LastOfArrayModule {
    type LastOfArray<Arr> =
        Arr extends [...infer _, infer Tail]
            ? Tail
            : never;

    type EX1 = LastOfArray<[1, 2, 3]>;           // => 3
    type EX2 = LastOfArray<['hello', 'world']>;  // => 'world'
    type EX3 = LastOfArray<[]>;                  // => never
}
