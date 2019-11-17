import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createDevTools } from "redux-devtools";
// eslint-disable-next-line import/no-extraneous-dependencies
import DockMonitor from "redux-devtools-dock-monitor";
// eslint-disable-next-line import/no-extraneous-dependencies
const Inspector = require("redux-devtools-inspector").default;

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    // Note: DockMonitor is visible by default.
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible>
        <Inspector />
    </DockMonitor>,
);

export default DevTools;
