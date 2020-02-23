import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { IDevTools } from "redux-devtools";
import { isProduction } from "../util";

// createDevTools takes a monitor and produces a DevTools component
// eslint-disable-next-line import/no-mutable-exports
let DevTools: IDevTools | undefined;

if (!isProduction) {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { createDevTools } = require("redux-devtools") as typeof import("redux-devtools");
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const DockMonitor = (require("redux-devtools-dock-monitor") as typeof import("redux-devtools-dock-monitor"))
        .default;
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const Inspector = require("redux-devtools-inspector").default;

    DevTools = createDevTools(
        // Monitors are individually adjustable with props.
        // Consult their repositories to learn about those props.
        // Here, we put LogMonitor inside a DockMonitor.
        // Note: DockMonitor is visible by default.
        <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible>
            <Inspector />
        </DockMonitor>,
    );
}

export default DevTools;
