type PropertyOf<Obj extends Record<string, any>, Query> =
    Query extends `${infer First}.${infer Rest}`
        ? PropertyOf<Obj[First], Rest> // If inferrable, we recursively deep search property
        : Query extends string         // If not, check if the query is unsplittable
            ? Obj[Query]
            : never;

type Test = PropertyOf<
    {
        user: {
            id: string;
            name: number;
            info: {
                description: string;
                interests: Array<string>;
            };
        };
        post: {
            title: string;
            content: string;
            comments: Array<string>;
        };
    },
    | 'user'
    | 'user.name'
    | 'user.info.interests'
    | 'post'
    | 'post.content'
>;