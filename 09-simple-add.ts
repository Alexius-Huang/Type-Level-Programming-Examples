module SimpleAddModule {
type NumberToTuple<N extends number, Constructed extends Array<any> = []> =
    `${N}` extends `${Constructed['length']}`
        ? Constructed
        : NumberToTuple<N, [any, ...Constructed]>;

type SimpleAdd<X extends number, Y extends number> =
    [...NumberToTuple<X>, ...NumberToTuple<Y>]['length'];

type EX1 = SimpleAdd<1, 2>;
type EX2 = SimpleAdd<3, 4>;
type EX3 = SimpleAdd<123, 456>;

// Type instantiation is excessively deep and possibly infinite.
// type CAN_NOT_EVALUATE = SimpleAdd<5000, 10000>;
}