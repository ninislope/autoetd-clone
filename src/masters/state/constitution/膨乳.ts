import produce from "immer";
import { constitutionState } from "../helper";

export const 膨乳 = constitutionState({
    levelName: true,
    levels: [
        {
            effects: {
                passive: person =>
                    produce(person, next => {
                        const { battleStatus } = next;
                        battleStatus.agi *= 0.4;
                        battleStatus.con *= 0.8;
                    }),
            },
        },
    ],
});
