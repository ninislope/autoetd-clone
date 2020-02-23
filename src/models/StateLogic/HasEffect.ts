import { StateEffects } from "./StateEffects";

export interface HasEffect<Id> {
    /** 名前 */
    readonly name?: string;
    /** 説明 */
    readonly description?: string;
    /** 効果 */
    readonly effects?: StateEffects;
    /** この効果をこれらの前に処理する */
    readonly before?: Id[];
    /** この効果をこれらの後に処理する */
    readonly after?: Id[];
}
