module VariableAssignment_03 {

type AnyFunction = (...params: Array<any>) => any;
type ReturnType_<T extends AnyFunction> =
    T extends (...params: any) => infer TResult
        ? TResult
        : never;

type EX1 = ReturnType_<(a: number) => string>;
// => string

type EX2 = ReturnType_<() => number>;
// => number

type EX3 = ReturnType_<
    (a: number, b: boolean, c: string) => void
>;
// => void

type Parameters_<T extends AnyFunction> =
    T extends (...params: infer TParams) => unknown
        ? TParams
        : [];

type EX4 = Parameters_<(a: number) => string>;
// => [number]

type EX5 = Parameters_<() => number>;
// => []

type EX6 = Parameters_<
    (a: number, b: boolean, c: string) => void
>;
// => [number, boolean, string]

}