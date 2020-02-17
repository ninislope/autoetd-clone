import { tHelper } from "../tHelper";
import { array, allKeys } from "./types";

export type BoolOperator = ">=" | "=" | "<=";

export const boolOperators = array(allKeys<BoolOperator>()([">=", "=", "<="]));

export const boolOperatorT = tHelper<BoolOperator>({
    ja: {
        ">=": "以上",
        "=": "",
        "<=": "以下",
    },
});

export function opBool(actual: number, op: BoolOperator, target: number) {
    if (op === ">=") return actual >= target;
    if (op === "=") return actual === target;
    if (op === "<=") return actual <= target;
    throw new Error("unreachable");
}
