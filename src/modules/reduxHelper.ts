import { Reducer } from "redux";

/** Flux Standard Action */
export interface StandardAction<Payload, Type = string> {
    /** action type */
    type: Type;
    /** payload */
    payload?: Payload;
    /** is error? */
    error?: boolean;
    /** meta info */
    meta?: { [key: string]: any } | null; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/** Flux Standard Action (type任意) */
export type PartialStandardAction<Payload, Type = string> = Partial<StandardAction<Payload, Type>>;

/** あるactionに対してのreducer */
export type ReduceHandler<State, Payload = void> = (
    state: State,
    payload: Payload,
    action: StandardAction<Payload>,
) => State;
/** action定義 */
export type ActionDefinition = (...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
/** actionの形式変更関数 */
export type ActionMapper = (...args: any[]) => PartialStandardAction<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/** reduxHelperから与えられるthis */
interface CreateHelperThis {
    type: string;
}

/**
 * Stateに対するredux reducer / action type / action creatorを作る
 * @param initialState 初期ステート
 */
export function reduxHelper<State>(initialState?: State) {
    /**
     * action を定義する
     * @param baseName action typeのプレフィクス アプリケーション内でユニークにする
     * @param actionCreatorsSource action creator / reducerの定義
     */
    function createActions<T extends { [name: string]: ActionDefinition }>(
        baseName: string,
        actionCreatorsSource: T,
    ): {
        actionCreators: T;
        actionTypes: { [Name in keyof T]: string };
        reducer: Reducer<State, ActionOf<T>>;
    } {
        const actionCreators = {} as T;
        const actionTypes = {} as { [Name in keyof T]: string };
        const reducers: { [name: string]: any } = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
        const names = Object.keys(actionCreatorsSource) as (keyof T)[];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < names.length; ++i) {
            const name = names[i];
            const type = `${baseName}/${name}`;
            const { actionCreator, reduceHandler } = actionCreatorsSource[name].apply({ type });
            actionCreators[name] = actionCreator;
            actionTypes[name] = type;
            reducers[type] = reduceHandler;
        }
        /** redux reducer */
        function reducer(
            state: State | undefined = initialState,
            action?: { type: string; payload?: any }, // eslint-disable-line no-shadow
        ) {
            // eslint-disable-line no-shadow
            if (!action) return state;
            const targetReducer = reducers[action.type];
            return targetReducer ? targetReducer(state, action.payload, action) : state;
        }
        return {
            actionCreators,
            actionTypes,
            reducer,
        };
    }

    /**
     * reducerの伴わない単体action
     */
    function action(): () => { type: string } & StandardAction<void>;
    /**
     * reducerの伴わない単体action
     */
    function action<Payload>(): (payload: Payload) => { type: string; payload: Payload } & StandardAction<Payload>;
    /**
     * reducerの伴わない単体action
     * @param actionMapper actionの形式変更関数
     */
    function action<AM extends ActionMapper>(actionMapper: AM): AM;
    function action<AM extends ActionMapper>(this: CreateHelperThis, actionMapper?: AM) {
        return function createAction(this: CreateHelperThis) {
            const actionCreator = actionMapper
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (...args: any[]) => ({
                      type: this.type,
                      ...actionMapper(...args),
                  })
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (payload: any) => ({ type: this.type, payload });
            return {
                actionCreator,
            };
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    /**
     * reducerつきのaction
     * @param reduceHandler reducer
     */
    function reduceAction(reduceHandler: ReduceHandler<State>): () => { type: string } & StandardAction<void>;
    /**
     * reducerつきのaction
     * @param reduceHandler reducer
     */
    function reduceAction<Payload>(
        reduceHandler: ReduceHandler<State, Payload>,
    ): (payload: Payload) => { type: string; payload: Payload } & StandardAction<Payload>;
    /**
     * reducerつきのaction
     * @param actionMapper actionの形式変更関数
     * @param reduceHandler reducer
     */
    function reduceAction<AM extends ActionMapper>(
        actionMapper: AM,
        reduceHandler: ReduceHandler<State, ReturnType<AM>>,
    ): AM;
    function reduceAction<AM extends ActionMapper>(
        actionMapperOrReduceHandler: AM | ReduceHandler<State>,
        maybeReduceHandler?: ReduceHandler<State>,
    ) {
        return function createReduceAction(this: CreateHelperThis) {
            const [actionMapper, reduceHandler] = maybeReduceHandler
                ? [actionMapperOrReduceHandler as AM, maybeReduceHandler as ReduceHandler<State>]
                : [undefined, actionMapperOrReduceHandler as ReduceHandler<State>];
            const actionCreator = actionMapper
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (...args: any[]) => ({
                      type: this.type,
                      ...actionMapper(...args),
                  })
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (payload: any) => ({ type: this.type, payload });
            return {
                actionCreator,
                reduceHandler,
            };
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    return {
        createActions,
        action,
        reduceAction,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionOf<T extends { [name: string]: (...args: any[]) => unknown }> = {
    [Action in keyof T]: ReturnType<T[Action]>;
}[keyof T];
