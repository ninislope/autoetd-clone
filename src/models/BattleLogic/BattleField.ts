import { Person } from "../Person";

/** バトル環境 */
export interface BattleField {
    readonly friends: Person[];
    // TODO: パーティに含まれないpersonにも効果をゆきとどかせる手段
    readonly enemies: Person[];
}
