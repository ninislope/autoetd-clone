import React from "react";
import Box from "../Box";
import Button from "./Button";

const Title: React.FC<{ back?(): any }> = ({ children, back }) => (
    <Box width={98} height={5} left={1} top={1}>
        {back && <Button onClick={back} label="←" />}
        {children}
    </Box>
);

export default Title;
