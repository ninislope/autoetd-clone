import React, { useMemo } from "react";

const style: React.CSSProperties = {
    color: "white",
    border: "2px solid white",
    position: "absolute",
    background: "black",
    boxSizing: "border-box",
};

export interface BoxProps {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
}

const Box: React.FC<BoxProps> = ({ width, height, left, top, children }) => {
    const useStyle = useMemo(
        () => ({
            ...style,
            width: `${width || 100}%`,
            height: `${height || 100}%`,
            left: `${left || 0}%`,
            top: `${top || 0}%`,
        }),
        [width, height, left, top],
    );

    return <div style={useStyle}>{children}</div>;
};

export default Box;
