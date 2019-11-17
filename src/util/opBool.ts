export function opBool(actual: number, op: Operator, target: number) {
    if (op === ">=") return actual >= target;
    if (op === "=") return actual === target;
    if (op === "<=") return actual <= target;
    throw new Error("unreachable");
}

export type Operator = ">=" | "=" | "<=";

export const opJa = {
    ">=": "以上",
    "=": "",
    "<=": "以下",
};
