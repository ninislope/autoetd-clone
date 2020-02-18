import { PersonClass } from "../PersonClass";
import { StateEffectParameter } from "./StateEffectParameter";
import { StateBattleEffectParameter } from "./StateBattleEffectParameter";
import { StatePostActionEffectParameter } from "./StatePostActionEffectParameter";
import { DungeonActionResultContent } from "../BattleLogic";

export interface StateEffects extends StateTriggerEffects {
    readonly passive?: (person: PersonClass) => PersonClass;
}

export interface StateTriggerEffects {
    // TODO: field, fieldInfo(dunceonTurnなど), battleInfo
    readonly active?: (field: StateEffectParameter) => DungeonActionResultContent;
    readonly dungeonStart?: (field: StateEffectParameter) => DungeonActionResultContent;
    readonly dungeonEnd?: (field: StateEffectParameter) => DungeonActionResultContent;
    readonly battleStart?: (field: StateEffectParameter) => DungeonActionResultContent;
    // 一時系の解除もここで
    readonly battleEnd?: (field: StateEffectParameter) => DungeonActionResultContent;
    readonly dungeonTurnStart?: (field: StateEffectParameter) => DungeonActionResultContent;
    readonly dungeonTurnEnd?: (field: StateEffectParameter) => DungeonActionResultContent;

    // 擦れて俊敏などが一時的に下がる？のと快感が走る・感度が上がるの両方ある
    // 状態異常の一時的な付与？
    // 一時的なpersonがよさそう？
    // バトル中のみ保持の短時間値ストアが欲しい説→それは状態異常では？
    // actionedで解除される状態異常でやる
    readonly preAction?: (param: StateBattleEffectParameter) => DungeonActionResultContent;
    // preで事前をやって、そこでついた状態異常が実際の失敗判定をする？
    // 絶頂などの判定とともにActorVariable単体依存のそれの方が良さそうな感じ有る
    // readonly isAttackSucceed?: (param: StrategyAimedParameter) => { succeed: boolean; messages: string[] };
    readonly postAction?: (param: StatePostActionEffectParameter) => DungeonActionResultContent;
    // postAttackの後も絶頂判定などある
    // アクション毎の一時系の解除もここで
    readonly actioned?: (param: StatePostActionEffectParameter) => DungeonActionResultContent;
}

export type StateTriggerEffectName = keyof StateTriggerEffects;
