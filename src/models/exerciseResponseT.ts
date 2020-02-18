import { ExerciseResponse } from "./ExerciseResponses";
import { PartId } from "./PartId";
import { genSwitcher } from "../util";
import { ActorSexualStatus } from "./ActorSexualStatus";
import { personPartT } from "./personPartT";

const epSwitcher = genSwitcher(
    [100, "激しく感じてしまった"],
    [20, "大きく感じてしまった"],
    [5, "感じてしまった"],
    [0, "疼いてしまった"],
    [-1, ""],
);

const shakeSwitcher = genSwitcher(
    [100, "激しく揺れて"],
    [20, "大きく揺れて"],
    [5, "揺れて"],
    [0, "少し揺れただけで"],
    [-1, ""],
);

const rubSwitcher = genSwitcher(
    [100, "激しく擦れて"],
    [20, "大きく擦れて"],
    [5, "擦れて"],
    [0, "少し擦れただけで"],
    [-1, ""],
);

export function exerciseResponseT(partId: PartId, status: ActorSexualStatus, res: ExerciseResponse) {
    const ep = epSwitcher(res.ep);
    const rub = rubSwitcher(res.rub);
    if (rub) return `${personPartT(partId, status)}が${rub}${ep}`;
    const shake = shakeSwitcher(res.size);
    if (rub) return `${personPartT(partId, status)}が${shake}${ep}`;
    return "";
}
