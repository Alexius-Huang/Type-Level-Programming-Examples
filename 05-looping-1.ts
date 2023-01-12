module Looping1_05 {
    type Partial_<Obj> = {
        [TKey in keyof Obj]?: Obj[TKey];
    };

    type User = {
        id: number;
        name: string;
        age: number;
    };

    type UserPartialInfo = Partial_<User>;


    type Primitives = string | number | boolean | bigint | null | undefined;
    type ToString<T> = T extends Primitives ? `${T}` : never;

    type EX1 = ToString<123>;
    // => "123"
    type EX2 = ToString<123 | true | undefined | 'Hello world'>;
    // => "123" | "true" | "undefined" | "Hello world"
}
