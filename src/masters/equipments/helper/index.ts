import { Equipment } from "../../../models/StateLogic/Equipment";

export function equipment<T extends Equipment>(state: T) {
    return state;
}
