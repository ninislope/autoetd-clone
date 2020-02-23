import { PersonClass } from "../PersonClass";
import {
    DungeonActionResultContent,
    StateEffectParameterClass,
    StrategyAimedParameterClass,
    StrategyActionedParameterClass,
} from "../BattleLogic";
import { ElementOf } from "../../util";

export interface StateEffects extends StateTriggerEffects {
    readonly passive?: (person: PersonClass) => PersonClass;
}

export interface StateTriggerEffects {
    // TODO: field, fieldInfo(dunceonTurnなど), battleInfo
    readonly active?: (field: StateEffectParameterClass) => DungeonActionResultContent;
    readonly deactive?: (field: StateEffectParameterClass) => DungeonActionResultContent;
    readonly dungeonStart?: (field: StateEffectParameterClass) => DungeonActionResultContent;
    readonly dungeonEnd?: (field: StateEffectParameterClass) => DungeonActionResultContent;
    readonly battleStart?: (field: StateEffectParameterClass) => DungeonActionResultContent;
    // 一時系の解除もここで
    readonly battleEnd?: (field: StateEffectParameterClass) => DungeonActionResultContent;
    readonly dungeonTurnStart?: (field: StateEffectParameterClass) => DungeonActionResultContent;
    readonly dungeonTurnEnd?: (field: StateEffectParameterClass) => DungeonActionResultContent;

    // 擦れて俊敏などが一時的に下がる？のと快感が走る・感度が上がるの両方ある
    // 状態異常の一時的な付与？
    // 一時的なpersonがよさそう？
    // バトル中のみ保持の短時間値ストアが欲しい説→それは状態異常では？
    // actionedで解除される状態異常でやる
    readonly preAction?: (param: StrategyAimedParameterClass) => DungeonActionResultContent;
    // preで事前をやって、そこでついた状態異常が実際の失敗判定をする？
    // 絶頂などの判定とともにActorVariable単体依存のそれの方が良さそうな感じ有る
    // readonly isAttackSucceed?: (param: StrategyAimedParameter) => { succeed: boolean; messages: string[] };
    readonly postAction?: (param: StrategyActionedParameterClass) => DungeonActionResultContent;
    // postAttackの後も絶頂判定などある
    // アクション毎の一時系の解除もここで
    readonly actioned?: (param: StrategyActionedParameterClass) => DungeonActionResultContent;
}

export type StateTriggerEffectName = keyof StateTriggerEffects;

export type StateBasicTriggerEffectName = {
    [Name in StateTriggerEffectName]: StateEffectParameterClass extends ElementOf<
        Parameters<NonNullable<StateTriggerEffects[Name]>>
    >
        ? Name
        : never;
}[StateTriggerEffectName];

/*
export const stateTriggerEffectParamClasses: {
    [Name in keyof StateTriggerEffects]-?: {
        new (param: ElementOf<Parameters<NonNullable<StateTriggerEffects[Name]>>>): ElementOf<
            Parameters<NonNullable<StateTriggerEffects[Name]>>
        >;
    };
} = {
    active: StateEffectParameterClass,
    deactive: StateEffectParameterClass,
    dungeonStart: StateEffectParameterClass,
    dungeonEnd: StateEffectParameterClass,
    battleStart: StateEffectParameterClass,
    battleEnd: StateEffectParameterClass,
    dungeonTurnStart: StateEffectParameterClass,
    dungeonTurnEnd: StateEffectParameterClass,
    preAction: StrategyAimedParameterClass,
    postAction: StrategyActionedParameterClass,
    actioned: StrategyActionedParameterClass,
};
*/
