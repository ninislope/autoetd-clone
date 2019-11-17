import React from "react";
import { connect } from "react-redux";
import pickStore from "../pickStore";
import * as scenes from "./Scenes";
import Fill from "./Fill";

const mapStateToProps = pickStore("main", ["currentScene"]);

type MappedState = ReturnType<typeof mapStateToProps>;

// eslint-disable-next-line no-shadow
const App: React.FC<MappedState> = ({ currentScene }) => {
    const Scene = scenes[currentScene];
    return (
        <Fill width={100} height={100} left={0} top={0} background="black">
            <Scene />
        </Fill>
    );
};

export default connect(mapStateToProps)(App);
