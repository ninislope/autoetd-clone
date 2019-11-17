import React from "react";
import { connect } from "react-redux";
import { changeScene } from "../../modules/main";

const mapDispatchToProps = {
    changeScene,
};

type MappedDispatch = typeof mapDispatchToProps;

// eslint-disable-next-line no-shadow
const StartScene: React.FC<MappedDispatch> = ({ changeScene }) => (
    <div>
        <button type="button" onClick={() => changeScene("dashboard")}>
            Start
        </button>
    </div>
);

export default connect(
    null,
    mapDispatchToProps,
)(StartScene);
