import React, { useEffect, useRef } from "react";

const style: React.CSSProperties = {
    overflow: "auto",
    width: "100%",
    height: "100%",
};

const Log: React.FC = ({ children }) => {
    const logAreaRef = useRef<HTMLDivElement | null>(null);
    const scrollHeightRef = useRef(0);

    useEffect(() => {
        if (!logAreaRef.current) return;
        const element = logAreaRef.current;

        const previousScrollHeight = scrollHeightRef.current;
        scrollHeightRef.current = element.scrollHeight;
        const scrollDiff = element.scrollTop + element.clientHeight - previousScrollHeight;
        const shouldScrollToBottom = Math.abs(scrollDiff) < 1;
        if (shouldScrollToBottom) {
            element.scrollTo(0, element.scrollHeight);
        } else {
            element.scrollTo(0, element.scrollTop + element.scrollHeight - previousScrollHeight);
        }
    }, [children]);

    return (
        <div style={style} ref={logAreaRef}>
            {children}
        </div>
    );
};

export default Log;
