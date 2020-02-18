import { array, allKeys } from "../util";
import { PartId } from "./PartId";

export const partIds = array(
    allKeys<PartId>()([
        "skin",
        "brain",
        "ear",
        "mouth",
        "tongue",
        "throat",
        "bust",
        "nipple",
        "hand",
        "arm",
        "armpit",
        "stomach",
        "back",
        "clitoris",
        "urethra",
        "bladder",
        "labia",
        "vagina",
        "portio",
        "womb",
        "ovary",
        "anus",
        "intestine",
        "hip",
        "thigh",
        "leg",
        "foot",
    ]),
);
