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
 * @property {(name: FileSystemObject) => boolean} [includes]
 */

const helperNames = ["helper", "filter"].reduce(
    (names, name) => ({ ...names, [name]: true }),
    /** @type {{[name: string]: boolean}} */ ({}),
);
/**
 *
 * @param {FileSystemObject} file
 */
function exceptHelper(file) {
    return !helperNames[file.basename().path];
}

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
        includes: exceptHelper,
    },
    {
        path: "src/masters/strategy/condition",
        idsFile: "src/models/BattleLogic/StrategyConditionId.ts",
        includes: exceptHelper,
    },
    {
        path: "src/masters/strategy/targetting",
        idsFile: "src/models/BattleLogic/StrategyTargettingId.ts",
        includes: exceptHelper,
    },
    {
        path: "src/masters/equipments",
        idsFile: "src/models/StateLogic/EquipmentId.ts",
    },
    {
        path: "src/masters/items",
        idsFile: "src/models/StateLogic/ItemId.ts",
    },
    {
        path: "src/masters/state/normal",
        idsFile: "src/models/StateLogic/NormalStateId.ts",
    },
    {
        path: "src/masters/state/sexual",
        idsFile: "src/models/StateLogic/SexualStateId.ts",
    },
    {
        path: "src/masters/state/constitution",
        idsFile: "src/models/StateLogic/ConstitutionStateId.ts",
    },
    {
        path: "src/masters/state/hidden",
        idsFile: "src/models/StateLogic/HiddenStateId.ts",
    },
];

for (const needId of needIds) {
    const files = new FileSystemObject(needId.path);
    const idFile = new FileSystemObject(needId.idsFile);
    const idNameTrans = needId.idName || (name => name);
    const typeName = needId.typeName || idFile.basename().path.replace(/\.tsx?$/, "");
    const includes = needId.includes || (() => true);

    const ids = files
        .childrenSync()
        .filter(entry => entry.basename().path !== "index.ts" && includes(entry))
        .map(entry => idNameTrans(entry.basename().path.replace(/\.tsx?$/, "")));

    const src = `export type ${typeName} = ${ids.map(id => `"${id}"`).join(" | ")};\n`;

    idFile.writeFileSync(src);
}
