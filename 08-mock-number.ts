module MockNumber {
    interface Number {
        isZero: boolean;
        prev?: Number;
    }
    type Next<T> = { prev: T, isZero: false };

    type _0 = { isZero: true };
    type _1 = Next<_0>;
    type _2 = Next<_1>;
    type _3 = Next<_2>;
    type _4 = Next<_3>;
    type _5 = Next<_4>;
    type _6 = Next<_5>;
    type _7 = Next<_6>;
    type _8 = Next<_7>;
    // ...
}
