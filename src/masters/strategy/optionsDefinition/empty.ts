import { strategyOptionDefinitionSource } from "./helper";

export const empty = strategyOptionDefinitionSource(() => ({ name: "無条件", definition: [], terms: ["無条件で"] }));
