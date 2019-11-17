import produce from "immer";
// eslint-disable-next-line import/named
import { StrategyAction, DungeonActionResultContent, BattleField, BattlerClass } from "../../../models";

export const attack: StrategyAction<[number | void]> = {
    name: (strength = 1) => (strength > 1 ? `${strength}倍攻撃` : "攻撃"),
    calc: (strength = 1) => (battle, battler, targets, turn) => {
        const results: DungeonActionResultContent[] = [];
        targets.reduce(
            (field, targetObj) => {
                const target = new BattlerClass(targetObj);
                // TODO: 失敗判定など
                const success = battler.person.variable.ep - 80 < Math.random() * 20;
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
                    battler.person.battleStatus.agi + battler.person.battleStatus.hit - target.person.battleStatus.agi >
                    0;
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
                    ((battler.person.battleStatus.atk / 2) * (strength || 1) - target.person.battleStatus.def / 4) *
                        (Math.random() * 0.2 + 1),
                );
                if (damage) {
                    const beforeHp = target.person.variable.hp;
                    const beforeHp2 = field[target.type][target.index].variable.hp;
                    const resultField = produce(field, next => {
                        const { hp } = next[target.type][target.index].variable;
                        // eslint-disable-next-line no-param-reassign
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
                                `[${target.person.variable.hp} : ${beforeHp} : ${beforeHp2} -> ${resultField[target.type][target.index].variable.hp}]`,
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
            },
            battle.lastField() as BattleField,
        );
        return results;
    },
};
