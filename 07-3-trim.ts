module TrimModule {
    type TrimLeft<Str extends string, TrimSegment extends string> =
        Str extends `${TrimSegment}${infer Result}`
            ? TrimLeft<Result, TrimSegment>
            : Str;
    type TrimRight<Str extends string, TrimSegment extends string> =
        Str extends `${infer Result}${TrimSegment}`
            ? TrimRight<Result, TrimSegment>
            : Str;
    type Trim<Str extends string, TrimSegment extends string> =
        TrimLeft<TrimRight<Str, TrimSegment>, TrimSegment>;

    type Result1 = TrimLeft<'   Hello World   ', ' '>;
    // => 'Hello world   '
    type Result2 = TrimRight<'   Hello World   ', ' '>;
    // => '   Hello world'
    type Result3 = Trim<'   Hello World   ', ' '>;
    // => 'Hello world'
}
