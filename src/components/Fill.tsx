import React, { useMemo } from "react";

const style: React.CSSProperties = {
    position: "absolute",
};

export interface FillProps {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    background?: string;
}

const Fill: React.FC<FillProps> = ({ width, height, left, top, background, children }) => {
    const useStyle = useMemo(
        () => ({
            ...style,
            width: `${width || 100}%`,
            height: `${height || 100}%`,
            left: `${left || 0}%`,
            top: `${top || 0}%`,
            background,
        }),
        [width, height, left, top, background],
    );

    return <div style={useStyle}>{children}</div>;
};

export default Fill;
