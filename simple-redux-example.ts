type State = { count: number };
type ActionFunction = (...params: Array<any>) => Action<any>;
type Action<Type extends string, TPayload = undefined> = {
    type: Type;
    payload: TPayload;
};

type TIncrement = (count: number) => Action<'INCREMENT', { count: number }>;
type TDecrement = (count: number) => Action<'DECREMENT', { count: number }>;
type TReset = () => Action<'RESET'>;

type Actions = ReturnType<
    | TIncrement
    | TDecrement
    | TReset
>;

const increment: TIncrement = (count: number) => ({
    type: 'INCREMENT',
    payload: { count }
});

const decrement: TDecrement = (count: number) => ({
    type: 'DECREMENT',
    payload: { count }
});

const reset: TReset = () => ({
    type: 'RESET',
    payload: undefined
});

const defaultState: State = { count: 0 };
const reducer = (state: State, action: Actions) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + action.payload.count };
        case 'DECREMENT':
            return { ...state, count: state.count - action.payload.count };
        case 'RESET':
        default:
            return defaultState;
    }
};
