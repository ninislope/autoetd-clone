import produce from "immer";
import { DungeonActionResultContent, StrategyAction } from "../../../models";

export const attack: StrategyAction = {
    name: "攻撃",
    description: "",
    cost: {},
    elements: ["none"],
    exercises: {
        chest: 100,
        lower: 100,
    },
    preExercise: {
        chest: 50,
        lower: 50,
    },
    targettingTypes: [{ select: "selectable", for: "enemies", maxCount: 1 }],
    calc: ({ battle, battler, targets, turn, actionId }) => {
        const results: DungeonActionResultContent[] = [];
        targets.reduce((field, target) => {
            // battler.person.sexualStatus.sensitivity;
            const { resultField, messages } = battle
                .lastField()
                .actor(battler)
                .person.triggerEffect("preAction", {
                    battle,
                    battler,
                    targets,
                    actionId,
                    field: battle.lastField(),
                });
            // 感じた部分で弱体化・弱体化数値が一定以上で確率(抵抗値で上下？)で失敗
            // 疼き・擦れ（乳首・クリ・おまんこ･ふともも等）・揺れ（おっぱい）・ゆるみ（尿道・乳首）・感じ（膀胱）
            // 運動強度で確率が上がる
            // 二カ所以上だと格段に弱体化が跳ね上がる
            // 発情は集中力に寄与＆一定確率でうずいて弱体化
            // TODO: 失敗判定など
            const success = battler.effectivePerson.variable.ep - 80 < Math.random() * 20;
            if (!success) {
                results.push({
                    messages: [
                        `${battler.person.name}は発情で集中できず攻撃失敗してしまった！`,
                        `${target.person.name}は余裕の表情だ。`,
                    ],
                    resultField: field,
                });
                return field;
            }
            // TODO: 命中の式
            const hit =
                battler.person.battleStatus.agi + battler.person.battleStatus.hit - target.person.battleStatus.agi > 0;
            if (!hit) {
                results.push({
                    messages: [
                        `${battler.person.name}の攻撃は外れた！`,
                        `${target.person.name}は攻撃をかわしダメージを受けなかった。`,
                    ],
                    resultField: field,
                });
                return field;
            }
            const damage = Math.floor(
                ((battler.person.battleStatus.atk / 2) * 1 - target.person.battleStatus.def / 4) *
                    (Math.random() * 0.2 + 1),
            );
            if (damage) {
                const beforeHp = target.person.variable.hp;
                const beforeHp2 = field[target.type][target.index].variable.hp;
                const resultField = produce(field, next => {
                    const { hp } = next[target.type][target.index].variable;
                    next[target.type][target.index].variable.hp = Math.max(0, Math.ceil(hp - damage));
                });
                /*
                    const resultField = {
                        ...field,
                        [target.type]: (field[target.type].slice() as Person[]).splice(target.index, 1, {
                            ...field[target.type][target.index],
                            variable: {
                                ...field[target.type][target.index].variable,
                                hp: Math.max(0, Math.ceil(field[target.type][target.index].variable.hp - damage)),
                            },
                        }),
                    };
                    */
                results.push({
                    messages: [
                        `${battler.person.name}の攻撃！`,
                        `${target.person.name}は${damage}ダメージを受けた！` +
                            `[${target.person.variable.hp} : ${beforeHp} : ${beforeHp2} -> ${
                                resultField[target.type][target.index].variable.hp
                            }]`,
                    ],
                    resultField,
                });
                return resultField;
            }
            results.push({
                messages: [
                    `ターン${turn}: ${battler.person.name}の攻撃は効果が無い！`,
                    `${target.person.name}はダメージを受けなかった。`,
                ],
                resultField: field,
            });
            return field;
        }, battle.lastField());
        return results;
    },
};
