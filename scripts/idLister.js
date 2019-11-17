// @ts-check

// eslint-disable-next-line import/no-extraneous-dependencies
const { FileSystemObject } = require("fso");
// eslint-disable-next-line import/no-extraneous-dependencies
const camelcase = require("camelcase");

/**
 * @typedef NeedId
 * @property {string} path
 * @property {string} idsFile
 * @property {string} [typeName]
 * @property {(name: string) => string} [idName]
 */

/** @type {NeedId[]} */
const needIds = [
    {
        path: "src/components/Scenes",
        idsFile: "src/models/SceneId.ts",
        idName: name => camelcase(name.replace(/Scene$/, "")),
    },
    {
        path: "src/masters/strategy/action",
        idsFile: "src/models/BattleLogic/StrategyActionId.ts",
    },
    {
        path: "src/masters/strategy/condition",
        idsFile: "src/models/BattleLogic/StrategyConditionId.ts",
    },
    {
        path: "src/masters/strategy/targetting",
        idsFile: "src/models/BattleLogic/StrategyTargettingId.ts",
    },
];

for (const needId of needIds) {
    const files = new FileSystemObject(needId.path);
    const idFile = new FileSystemObject(needId.idsFile);
    const idNameTrans = needId.idName || (name => name);
    const typeName = needId.typeName || idFile.basename().path.replace(/\.tsx?$/, "");

    const ids = files
        .childrenSync()
        .filter(entry => entry.basename().path !== "index.ts")
        .map(entry => idNameTrans(entry.basename().path.replace(/\.tsx?$/, "")));

    const src = `export type ${typeName} = ${ids.map(id => `"${id}"`).join(" | ")};\n`;

    idFile.writeFileSync(src);
}
