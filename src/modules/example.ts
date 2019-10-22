import { reduxHelper } from "./reduxHelper";

const { createActions, reduceAction } = reduxHelper({
    count: 1,
});

const { reducer, actionCreators, actionTypes } = createActions("example", {
    countup: reduceAction(state => ({ ...state, count: state.count + 1 })),
});

export default reducer;

export const { countup } = actionCreators;

export { actionTypes };
