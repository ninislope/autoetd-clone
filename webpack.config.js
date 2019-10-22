// @ts-check

const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import("webpack").Configuration} */
const config = {
    context: __dirname,
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx"],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
        }),
    ],
};

module.exports = config;
