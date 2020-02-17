import produce from "immer";
import { sexualState } from "../helper";

export const 発情 = sexualState({
    levelName: true,
    levels: [
        {
            effects: {
                passive: person =>
                    produce(person, next => {
                        next.battleStatus.con *= 0.8;
                    }),
            },
        },
    ],
});
