import { StrategyOptionTypeFromDefinition, StrategyOptionDefinitionSource, ActorClass } from "../../../../models";

export interface TargettingFilter<D extends StrategyOptionDefinitionSource<any, any, any, any, any>> {
    definition: D;
    filter: (
        options: StrategyOptionTypeFromDefinition<ReturnType<D>["definition"]>,
    ) => (actors: ActorClass[]) => ActorClass[];
}

export function targettingFilter<D extends StrategyOptionDefinitionSource<any, any, any, any, any>>(definition: D) {
    return function defineTargettingFilter(
        filter: (
            options: StrategyOptionTypeFromDefinition<ReturnType<D>["definition"]>,
        ) => (actors: ActorClass[]) => ActorClass[],
    ): TargettingFilter<D> {
        return { definition, filter };
    };
}
