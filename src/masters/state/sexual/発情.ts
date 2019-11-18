import produce from "immer";
import { sexualState } from "../../../models";

export const 発情 = sexualState({
    levelName: true,
    levels: [
        {
            effects: {
                passive: person =>
                    produce(person, next => {
                        // eslint-disable-next-line no-param-reassign
                        next.battleStatus.con *= 0.8;
                    }),
            },
        },
    ],
});
