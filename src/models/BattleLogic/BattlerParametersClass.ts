import { immerable } from "immer";
import { toExistsHash } from "../../util";
import { BattleFieldClass } from "./BattleFieldClass";
import { BattlerParameterClass } from "./BattlerParameterClass";

export class BattlerParametersClass extends Array<BattlerParameterClass> {
    [immerable] = true;

    filterCharacters() {
        return new BattlerParametersClass(...this.filter(battler => battler.type === "actors"));
    }

    filterEnemies() {
        return new BattlerParametersClass(...this.filter(battler => battler.type === "enemies"));
    }

    rejectCharacters(field: BattleFieldClass) {
        const characterOwnerIndexes = toExistsHash(this.filterCharacters().indexes());
        return new BattlerParametersClass(
            ...field.actors
                .map((_c, index) => index)
                .filter(index => !characterOwnerIndexes[index])
                .map(index => new BattlerParameterClass({ type: "actors", index })),
        );
    }

    rejectEnemies(field: BattleFieldClass) {
        const enemyOwnerIndexes = toExistsHash(this.filterEnemies().indexes());
        return new BattlerParametersClass(
            ...field.enemies
                .map((_c, index) => index)
                .filter(index => !enemyOwnerIndexes[index])
                .map(index => new BattlerParameterClass({ type: "enemies", index })),
        );
    }

    indexes() {
        return this.map(battler => battler.index);
    }
}
