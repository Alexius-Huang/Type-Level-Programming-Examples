module VariableAssignment2_04 {

type ElementTypeOfArray<T> = T extends Array<infer ElementType>
    ? ElementType
    : never;

type EX1 = ElementTypeOfArray<number[]>;
// => number
type EX2 = ElementTypeOfArray<Array<string>>;
// => string

type GetDataFromResponse<TResponse> =
    TResponse extends { status: number; data: infer TData }
        ? TData
        : never;

type EX3 = GetDataFromResponse<{
    status: 200;
    data: { message: 'Hello World!' };
}>;
// => { message: 'Hello World!' }

type EX4 = GetDataFromResponse<{ message: 'Hello World!' }>;
// => never

// The example is equivalent to using index-access type:
type EX5 = ({
    status: 200;
    data: { message: 'Hello World!' };
})['data'];

type GetFirstCharacter<Str extends string> =
    Str extends `${infer FirstCharacter}${infer _}`
        ? FirstCharacter
        : '';

type EX6 = GetFirstCharacter<"Hello">;
// => "H"
type EX7 = GetFirstCharacter<"H">;
// => "H"
type EX8 = GetFirstCharacter<"">;
// => ""
                

}