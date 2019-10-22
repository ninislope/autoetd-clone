import React, { useReducer } from "react";
import { connect } from "react-redux";
import pickStore from "../pickStore";
import { countup } from "../modules/example";

const mapStateToProps = pickStore("example", ["count"]);
const mapDispatchToProps = {
    countup,
};

type MappedState = ReturnType<typeof mapStateToProps>;
type MappedDispatch = typeof mapDispatchToProps;

// eslint-disable-next-line no-shadow
const App: React.FC<MappedState & MappedDispatch> = ({ count, countup }) => {
    const [c2, c2up] = useReducer((c: number) => c + 1, 0);
    return (
        <div>
            <button type="button" onClick={() => countup()}>
                + count
            </button>
            {count}
            <hr />
            <button type="button" onClick={() => c2up(1)}>
                + count
            </button>
            {c2}
            <hr />
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
