import { Displayable } from "./Displayable";

/** 戦略オプション定義ソース */
export interface StrategyOptionDefinitionSource<
    OptionsDefinition extends StrategyOptionDefinition<Definitions, Values, Value, Name>,
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
> {
    (...options: any[]): OptionsDefinition;
}

/** 戦略オプション定義 */
export interface StrategyOptionDefinition<
    Definitions extends readonly StrategyOptionValueDefinition<Values, any, Name>[],
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
> {
    readonly name: string;
    /** 戦略オプションセット定義 */
    readonly definition: Definitions;
    /** 間に挟む説明文字列 */
    readonly terms: readonly Displayable[];
}

/** 単一戦略オプション定義 */
export interface StrategyOptionValueDefinition<
    Values extends readonly StrategyOptionValueWithLabel<Value>[],
    Value extends StrategyOptionValueBase,
    Name extends string
> {
    /** ありうるオプション値 */
    readonly possibleValues: Values;
    /** オプション値名 */
    readonly name: Name;
    /** 表示文字列 */
    readonly label?: Displayable;
}

/** 単一戦略オプションのとりうる値（表示文字列付） */
export interface StrategyOptionValueWithLabel<Value extends StrategyOptionValueBase> {
    /** 値 */
    readonly value: Value;
    /** 表示文字列 */
    readonly label: Displayable;
}

/** 単一戦略オプションのとりうる値 */
export type StrategyOptionValueBase = string | number;

/** 戦略オプションの型導出 */
export type StrategyOptionTypeFromDefinition<
    Def extends readonly StrategyOptionValueDefinition<any, any, any>[]
> = Def extends readonly [StrategyOptionValueDefinition<infer E1, any, infer E1N>]
    ? { [K in E1N]: ValueFromWithNameOption<E1> }
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, infer E1N>,
          StrategyOptionValueDefinition<infer E2, any, infer E2N>,
      ]
    ? { [K in E1N]: ValueFromWithNameOption<E1> } & { [K in E2N]: ValueFromWithNameOption<E2> }
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, infer E1N>,
          StrategyOptionValueDefinition<infer E2, any, infer E2N>,
          StrategyOptionValueDefinition<infer E3, any, infer E3N>,
      ]
    ? { [K in E1N]: ValueFromWithNameOption<E1> } &
          { [K in E2N]: ValueFromWithNameOption<E2> } &
          { [K in E3N]: ValueFromWithNameOption<E3> }
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, infer E1N>,
          StrategyOptionValueDefinition<infer E2, any, infer E2N>,
          StrategyOptionValueDefinition<infer E3, any, infer E3N>,
          StrategyOptionValueDefinition<infer E4, any, infer E4N>,
      ]
    ? { [K in E1N]: ValueFromWithNameOption<E1> } &
          { [K in E2N]: ValueFromWithNameOption<E2> } &
          { [K in E3N]: ValueFromWithNameOption<E3> } &
          { [K in E4N]: ValueFromWithNameOption<E4> }
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, infer E1N>,
          StrategyOptionValueDefinition<infer E2, any, infer E2N>,
          StrategyOptionValueDefinition<infer E3, any, infer E3N>,
          StrategyOptionValueDefinition<infer E4, any, infer E4N>,
          StrategyOptionValueDefinition<infer E5, any, infer E5N>,
      ]
    ? { [K in E1N]: ValueFromWithNameOption<E1> } &
          { [K in E2N]: ValueFromWithNameOption<E2> } &
          { [K in E3N]: ValueFromWithNameOption<E3> } &
          { [K in E4N]: ValueFromWithNameOption<E4> } &
          { [K in E5N]: ValueFromWithNameOption<E5> }
    : {};

/** 戦略オプションの型導出 */
export type StrategyOptionTypeFromDefinitionArray<
    Def extends readonly StrategyOptionValueDefinition<any, any, any>[]
> = Def extends readonly [StrategyOptionValueDefinition<infer E1, any, any>]
    ? [ValueFromWithNameOption<E1>]
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, any>,
          StrategyOptionValueDefinition<infer E2, any, any>,
      ]
    ? [ValueFromWithNameOption<E1>, ValueFromWithNameOption<E2>]
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, any>,
          StrategyOptionValueDefinition<infer E2, any, any>,
          StrategyOptionValueDefinition<infer E3, any, any>,
      ]
    ? [ValueFromWithNameOption<E1>, ValueFromWithNameOption<E2>, ValueFromWithNameOption<E3>]
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, any>,
          StrategyOptionValueDefinition<infer E2, any, any>,
          StrategyOptionValueDefinition<infer E3, any, any>,
          StrategyOptionValueDefinition<infer E4, any, any>,
      ]
    ? [
          ValueFromWithNameOption<E1>,
          ValueFromWithNameOption<E2>,
          ValueFromWithNameOption<E3>,
          ValueFromWithNameOption<E4>,
      ]
    : Def extends readonly [
          StrategyOptionValueDefinition<infer E1, any, any>,
          StrategyOptionValueDefinition<infer E2, any, any>,
          StrategyOptionValueDefinition<infer E3, any, any>,
          StrategyOptionValueDefinition<infer E4, any, any>,
          StrategyOptionValueDefinition<infer E5, any, any>,
      ]
    ? [
          ValueFromWithNameOption<E1>,
          ValueFromWithNameOption<E2>,
          ValueFromWithNameOption<E3>,
          ValueFromWithNameOption<E4>,
          ValueFromWithNameOption<E5>,
      ]
    : unknown[];

/** 表示文字列付値から値の型を取得 */
type ValueFromWithNameOption<T> = T extends ReadonlyArray<StrategyOptionValueWithLabel<infer Value>> ? Value : unknown;
