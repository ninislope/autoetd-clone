import React from "react";
import Fill from "../Fill";
import MenuWindow from "../Windows/MenuWindow";
import Box from "../Box";
import Title from "../ui/Title";
import t from "../../t";

const DashboardScene = () => (
    <Fill>
        <Title>{t("拠点")}</Title>
        <Box width={20} height={92} left={1} top={7}>
            <MenuWindow />
        </Box>
    </Fill>
);

export default DashboardScene;
