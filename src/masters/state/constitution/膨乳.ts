import produce from "immer";
import { constitutionState } from "../helper";
import { PersonClass } from "../../../models/PersonClass";

function bustup({
    nipple,
    bust,
    agi,
    con,
}: {
    nipple: { size: number; sensitivity: number };
    bust: { size: number; sensitivity: number };
    agi: number;
    con: number;
}) {
    return (person: PersonClass) =>
        produce(
            person.setBattleStatus(
                produce(person.battleStatus, next => {
                    next.agi *= agi;
                    next.con *= con;
                }),
            ),
            next => {
                next.sexualStatus.size.bust += bust.size;
                next.sexualStatus.size.nipple += nipple.size;
                next.sexualStatus.sensitivity.bust *= bust.sensitivity;
                next.sexualStatus.sensitivity.nipple *= nipple.sensitivity;
            },
        );
}

export const 膨乳 = constitutionState({
    levelName: true,
    levels: [
        {
            effects: {
                passive: bustup({
                    agi: 0.95,
                    con: 1,
                    nipple: { size: 0.05, sensitivity: 1.01 },
                    bust: { size: 5, sensitivity: 1.05 },
                }),
            },
        },
        {
            effects: {
                passive: bustup({
                    agi: 0.9,
                    con: 1,
                    nipple: { size: 0.1, sensitivity: 1.1 },
                    bust: { size: 11, sensitivity: 1.2 },
                }),
            },
        },
        {
            effects: {
                passive: bustup({
                    agi: 0.8,
                    con: 0.95,
                    nipple: { size: 0.15, sensitivity: 1.25 },
                    bust: { size: 18, sensitivity: 1.5 },
                }),
            },
        },
        {
            effects: {
                passive: bustup({
                    agi: 0.7,
                    con: 0.85,
                    nipple: { size: 0.25, sensitivity: 1.4 },
                    bust: { size: 27, sensitivity: 1.95 },
                }),
            },
        },
        {
            effects: {
                passive: bustup({
                    agi: 0.5,
                    con: 0.7,
                    nipple: { size: 0.35, sensitivity: 1.7 },
                    bust: { size: 38, sensitivity: 2.5 },
                }),
            },
        },
        {
            effects: {
                passive: bustup({
                    agi: 0.28,
                    con: 0.5,
                    nipple: { size: 0.5, sensitivity: 2.2 },
                    bust: { size: 55, sensitivity: 3.3 },
                }),
            },
        },
    ],
});
