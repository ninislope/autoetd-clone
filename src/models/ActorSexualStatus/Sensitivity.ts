export interface Sensitivity {
    /** 肌 */
    readonly skin: number;
    /** 脳 */
    readonly brain: number;
    /** 耳 */
    readonly ear: number;
    /** 口 */
    readonly mouth: number;
    /** 舌 */
    readonly tongue: number;
    /** 喉 */
    readonly throat: number;
    /** 乳房 */
    readonly bust: number;
    /** 乳首 */
    readonly nipple: number;
    /** 手 */
    readonly hand: number;
    /** 腕 */
    readonly arm: number;
    /** 腋（わき） */
    readonly armpit: number;
    /** おなか */
    readonly stomach: number;
    /** 背中 */
    readonly back: number;
    /** 陰核 */
    readonly clitoris: number;
    /** 尿道 */
    readonly urethra: number;
    /** 膀胱 */
    readonly bladder: number;
    /** 陰唇 */
    readonly labia: number;
    /** 膣 */
    readonly vagina: number;
    /** 子宮口（子宮膣部） */
    readonly portio: number;
    /** 子宮 */
    readonly womb: number;
    /** 卵巣 */
    readonly ovary: number;
    /** 肛門 */
    readonly anus: number;
    /** 腸 */
    readonly intestine: number;
    /** 尻 */
    readonly hip: number;
    /** ふともも */
    readonly thigh: number;
    /** 脚 */
    readonly leg: number;
    /** 足 */
    readonly foot: number;
}

export const zeroSensitivity: Sensitivity = {
    skin: 0,
    brain: 0,
    ear: 0,
    mouth: 0,
    tongue: 0,
    throat: 0,
    bust: 0,
    nipple: 0,
    hand: 0,
    arm: 0,
    armpit: 0,
    stomach: 0,
    back: 0,
    clitoris: 0,
    urethra: 0,
    bladder: 0,
    labia: 0,
    vagina: 0,
    portio: 0,
    womb: 0,
    ovary: 0,
    anus: 0,
    intestine: 0,
    hip: 0,
    thigh: 0,
    leg: 0,
    foot: 0,
};
