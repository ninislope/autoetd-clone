import { genStatePicker } from "./util";
import { RootStore } from "./models";

const pickStore = genStatePicker<RootStore>();

export default pickStore;
