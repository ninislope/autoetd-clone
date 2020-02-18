import { PartId } from "../PartId";

export interface Size {
    /** 脳（脳縮小） */
    readonly brain: number;
    /** 乳房（膨乳） トップとアンダーの差 */
    readonly bust: number;
    /** アンダーバスト */
    readonly underBust: number;
    /** 乳首（乳首肥大） */
    readonly nipple: number;
    /** おなか（ボテ腹） */
    readonly stomach: number;
    /** 陰核（陰核肥大） */
    readonly clitoris: number;
    /** 尿道（尿道拡張） */
    readonly urethra: number;
    /** 膀胱（膀胱縮小） */
    readonly bladder: number;
    /** 陰唇（マン肉肥大） */
    readonly labia: number;
    /** 膣（ガバガバマンコ） */
    readonly vagina: number;
    /** 卵巣（卵巣肥大） */
    readonly ovary: number;
    /** 肛門（アナル拡張） */
    readonly anus: number;
    /** 尻（尻肉肥大） */
    readonly hip: number;
    /** ふともも（ふともも肥大） */
    readonly thigh: number;
}

export const zeroSize: Size = {
    brain: 0,
    bust: 0,
    underBust: 0,
    nipple: 0,
    stomach: 0,
    clitoris: 0,
    urethra: 0,
    bladder: 0,
    labia: 0,
    vagina: 0,
    ovary: 0,
    anus: 0,
    hip: 0,
    thigh: 0,
};

export type SizePartId = keyof Size;
export type SizePartPartialId = Exclude<keyof Size, "underBust">;

export function isSizePart(part: PartId): part is SizePartPartialId {
    return (zeroSize as any)[part] !== undefined;
}
