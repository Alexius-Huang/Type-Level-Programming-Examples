module ConditionalTypes_02 {

type IsNumber<T> = T extends number ? true : false;

type Is_123_A_Number = IsNumber<123>;
// => true

type Is_NaN_A_Number = IsNumber<typeof NaN>;
// => true

type Is_String_A_Number = IsNumber<"Hello">;
// => false

type Is_undefined_A_Number = IsNumber<undefined>;
// => false

// --- //

type XOR<M extends boolean, N extends boolean> =
    [M, N] extends [true, true]   ? false :
    [M, N] extends [false, false] ? false : true;

type EX1 = XOR<true, true>;
type EX2 = XOR<true, false>;
type EX3 = XOR<false, true>;
type EX4 = XOR<false, false>;

}