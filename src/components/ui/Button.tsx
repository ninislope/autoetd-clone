import React from "react";

const style: React.CSSProperties = {
    border: "none",
    background: "transparent",
    color: "#fff",
};

export interface ButtonProps {
    label: JSX.Element | string;
}

const Button: React.FC<React.HTMLAttributes<HTMLButtonElement> & ButtonProps> = props => (
    // eslint-disable-next-line react/jsx-props-no-spreading, react/button-has-type
    <button {...{ type: "button", ...props }} style={style}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.label}
    </button>
);

export default Button;
