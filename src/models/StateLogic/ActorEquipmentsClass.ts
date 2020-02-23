import { immerable } from "immer";
import { ActorEquipments, equipmentParts } from "./ActorEquipments";
import { PersonClass } from "../PersonClass";
import { OwnedId, Owned, isOwnedEquipment } from "./Owned";
import { EquipmentClass } from "./EquipmentClass";
import { ActorEquipmentLimits } from "./ActorEquipmentLimits";
import * as equipments from "../../masters/equipments";

export class ActorEquipmentsClass implements ActorEquipments {
    [immerable] = true;

    static sortEquipments(stateLevels: EquipmentClass[]) {
        // before/after考慮->id昇順
        return stateLevels.slice().sort((a, b) => {
            const bId = b.id;
            // eslint-disable-next-line no-undef
            if (a.before?.includes(bId)) return -1;
            // eslint-disable-next-line no-undef
            if (a.after?.includes(bId)) return 1;
            const aId = a.id;
            // eslint-disable-next-line no-undef
            if (b.before?.includes(aId)) return 1;
            // eslint-disable-next-line no-undef
            if (b.after?.includes(aId)) return -1;
            if (aId < bId) return -1;
            if (aId > bId) return 1;
            return 0;
        });
    }

    /** 頭 */
    readonly head!: readonly OwnedId[];

    /** 首 */
    readonly neck!: readonly OwnedId[];

    /** 手首 */
    readonly wrist!: readonly OwnedId[];

    /** アウター */
    readonly outer!: readonly OwnedId[];

    /** トップス */
    readonly tops!: readonly OwnedId[];

    /** ブラジャー */
    readonly bra!: readonly OwnedId[];

    /** 下着（上） */
    readonly undershirt!: readonly OwnedId[];

    /** 下着（下） */
    readonly shorts!: readonly OwnedId[];

    /** ボトムス */
    readonly bottoms!: readonly OwnedId[];

    /** 靴 */
    readonly shoes!: readonly OwnedId[];

    /** アクセサリー */
    readonly accessories!: readonly OwnedId[];

    /** 肌 */
    readonly skin!: readonly OwnedId[];

    /** 脳 */
    readonly brain!: readonly OwnedId[];

    /** 耳 */
    readonly ear!: readonly OwnedId[];

    /** 口 */
    readonly mouth!: readonly OwnedId[];

    /** 舌 */
    readonly tongue!: readonly OwnedId[];

    /** 喉 */
    readonly throat!: readonly OwnedId[];

    /** 乳房 */
    readonly bust!: readonly OwnedId[];

    /** 乳首 */
    readonly nipple!: readonly OwnedId[];

    /** 手 */
    readonly hand!: readonly OwnedId[];

    /** 腕 */
    readonly arm!: readonly OwnedId[];

    /** 腋 */
    readonly armpit!: readonly OwnedId[];

    /** おなか */
    readonly stomach!: readonly OwnedId[];

    /** 背中 */
    readonly back!: readonly OwnedId[];

    /** 陰核 */
    readonly clitoris!: readonly OwnedId[];

    /** 尿道 */
    readonly urethra!: readonly OwnedId[];

    /** 膀胱 */
    readonly bladder!: readonly OwnedId[];

    /** 陰唇 */
    readonly labia!: readonly OwnedId[];

    /** 膣 */
    readonly vagina!: readonly OwnedId[];

    /** 子宮口（子宮膣部） */
    readonly portio!: readonly OwnedId[];

    /** 子宮 */
    readonly womb!: readonly OwnedId[];

    /** 卵巣 */
    readonly ovary!: readonly OwnedId[];

    /** 肛門 */
    readonly anus!: readonly OwnedId[];

    /** 腸 */
    readonly intestine!: readonly OwnedId[];

    /** 尻 */
    readonly hip!: readonly OwnedId[];

    /** ふともも */
    readonly thigh!: readonly OwnedId[];

    /** 脚 */
    readonly leg!: readonly OwnedId[];

    /** 足 */
    readonly foot!: readonly OwnedId[];

    readonly equipmentLimits: ActorEquipmentLimits;

    // TODO
    readonly owneds: { [id: string]: Owned };

    constructor(
        actorEquipments: ActorEquipments,
        equipmentLimits: ActorEquipmentLimits,
        // TODO
        owneds: { [id: string]: Owned } = {},
    ) {
        for (const equipmentPart of equipmentParts) this[equipmentPart] = actorEquipments[equipmentPart];
        this.equipmentLimits = equipmentLimits;
        this.owneds = owneds;
    }

    // get(id: EquipmentId) {}

    // add(owned: OwnedEquipment, part: EquipmentPart) {}

    // remove(owned: OwnedEquipment) {}

    get allOwnedIds() {
        return equipmentParts.reduce((all, equipmentPart) => [...all, ...this[equipmentPart]], [] as OwnedId[]);
    }

    get sortedEquipments() {
        return ActorEquipmentsClass.sortEquipments(
            equipmentParts
                .reduce((all, equipmentPart) => [...all, ...this[equipmentPart]], [] as OwnedId[])
                .map(ownedId => this.owneds[ownedId])
                .filter(isOwnedEquipment)
                .map(owned => new EquipmentClass(equipments[owned.contentId], owned.contentId)),
        );
    }

    static applyPassive(rawPerson: PersonClass): PersonClass {
        return rawPerson.equipments.sortedEquipments
            .map(state => state.effect("passive"))
            .reduce((person, passive) => (passive ? passive(person) : person), rawPerson);
    }
}
