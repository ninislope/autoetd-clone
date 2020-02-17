import { targettingFilter } from "./TargettingFilter";

export const none = targettingFilter(() => {
    return {
        name: "無条件",
        definition: [] as const,
        terms: [""],
    };
})(() => persons => persons);
