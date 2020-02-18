// @ts-check

// eslint-disable-next-line import/no-extraneous-dependencies
const { FileSystemObject } = require("fso");
// eslint-disable-next-line import/no-extraneous-dependencies
const camelcase = require("camelcase");

const indent = "    ";
const root = new FileSystemObject("src");

/**
 * @typedef {NeedIndexExports | NeedIndexDefaults | NeedIndexReadonlyInterface} NeedIndex
 */

/**
 * @typedef NeedIndexExports
 * @property {string} path
 * @property {"exports"} type
 * @property {(file: FileSystemObject) => boolean} [includes]
 */

/**
 * @typedef NeedIndexDefaults
 * @property {string} path
 * @property {"defaults"} type
 * @property {(name: string) => string} [name]
 * @property {(file: FileSystemObject) => boolean} [includes]
 */

/**
 * @typedef NeedIndexReadonlyInterface
 * @property {string} path
 * @property {"readonlyInterface"} type
 * @property {(name: string) => string} [name]
 * @property {string} [exportName]
 * @property {(file: FileSystemObject) => boolean} [includes]
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

/** @type {NeedIndex[]} */
const needIndexes = [
    {
        path: "components/Scenes",
        type: "defaults",
        /** @param {string} name */
        name: name => camelcase(name.replace(/Scene$/, "")),
    },
    {
        path: "models/ActorSexualStatus",
        type: "readonlyInterface",
        /** @param {string} name */
        name: name => camelcase(name),
    },
    {
        path: "models/Scenes",
        type: "readonlyInterface",
        /** @param {string} name */
        name: name => camelcase(name.replace(/Scene$/, "")),
    },
    { path: "models/BattleLogic", type: "exports" },
    { path: "models/StateLogic", type: "exports" },
    { path: "models", type: "exports" },
    { path: "util", type: "exports" },
    { path: "masters/equipments", type: "exports", includes: exceptHelper },
    { path: "masters/items", type: "exports", includes: exceptHelper },
    { path: "masters/person/friends", type: "exports", includes: exceptHelper },
    { path: "masters/person/enemies", type: "exports", includes: exceptHelper },
    { path: "masters/state", type: "exports", includes: exceptHelper },
    { path: "masters/state/normal", type: "exports", includes: exceptHelper },
    { path: "masters/state/sexual", type: "exports", includes: exceptHelper },
    { path: "masters/state/constitution", type: "exports", includes: exceptHelper },
    { path: "masters/state/hidden", type: "exports", includes: exceptHelper },
    { path: "masters/strategy/condition", type: "exports", includes: exceptHelper },
    { path: "masters/strategy/targetting", type: "exports", includes: exceptHelper },
    { path: "masters/strategy/targetting/filter", type: "exports" },
    { path: "masters/strategy/action", type: "exports", includes: exceptHelper },
    { path: "masters/strategy/optionsDefinition", type: "exports", includes: exceptHelper },
];

/** @type {{[ext: string]: boolean}} */
const allowExts = [".ts", ".tsx"].reduce((all, ext) => ({ ...all, [ext]: true }), {});

const indexFilenames = ["index.ts", "index.tsx"].reduce((all, ext) => ({ ...all, [ext]: true }), {});

/**
 *
 * @param {FileSystemObject} entry
 */
function isAllowedEntry(entry) {
    return !indexFilenames[entry.basename().path] && (allowExts[entry.extname()] || entry.isDirectorySync());
}

/**
 *
 * @param {FileSystemObject} entry
 */
function entryName(entry) {
    return entry.path.replace(/\.tsx?$/, "");
}

for (const needIndex of needIndexes) {
    const needIndexPath = root.join(needIndex.path);
    const includes = needIndex.includes || (() => true);
    const entries = needIndexPath
        .filteredChildrenSync(entry => isAllowedEntry(entry) && includes(entry))
        .map(entry => needIndexPath.relative(entry));
    if (needIndex.type === "exports") {
        const src = entries.map(entry => `export * from "./${entryName(entry)}";\n`).join("");
        const indexEntry = needIndexPath.join("index.ts");
        indexEntry.writeFileSync(src);
    } else if (needIndex.type === "defaults") {
        const nameTrans = needIndex.name || (name => name);
        const importSrc = entries
            .map(entry => `import ${nameTrans(entryName(entry))} from "./${entryName(entry)}";\n`)
            .join("");
        const exportSrc = `export {\n${entries.map(entry => `${indent}${nameTrans(entryName(entry))},\n`).join("")}}\n`;
        const src = `${importSrc}\n${exportSrc}`;
        const indexEntry = needIndexPath.join("index.ts");
        indexEntry.writeFileSync(src);
    } else if (needIndex.type === "readonlyInterface") {
        const nameTrans = needIndex.name || (name => name);
        const exportName = needIndex.exportName || entryName(needIndexPath.basename());
        const importSrc = entries
            .map(entry => `import { ${entryName(entry)} } from "./${entryName(entry)}";\n`)
            .join("");
        const exportSrc = `export interface ${exportName} {\n${entries
            .map(entry => `${indent}readonly ${nameTrans(entryName(entry))}: ${entryName(entry)};\n`)
            .join("")}}\n`;
        const src = `${importSrc}\n${exportSrc}`;
        const indexEntry = needIndexPath.join("index.ts");
        indexEntry.writeFileSync(src);
    }
}
