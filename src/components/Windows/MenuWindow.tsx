import React from "react";
import { connect } from "react-redux";
import Fill from "../Fill";
import t from "../../t";
import { changeScene } from "../../modules/main";
import Button from "../ui/Button";

const mapDispatchToProps = {
    changeScene,
};

type MappedDispatch = typeof mapDispatchToProps;

// eslint-disable-next-line no-shadow
const MenuWindow: React.FC<MappedDispatch> = ({ changeScene }) => {
    return (
        <Fill>
            <Button label={t("ダンジョン")} onClick={() => changeScene("dungeon")} />
            <br />
            <Button label={t("街")} onClick={() => changeScene("town")} />
        </Fill>
    );
};

export default connect(
    null,
    mapDispatchToProps,
)(MenuWindow);
