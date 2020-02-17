import { Lang } from "./Lang";

const lang: Lang = "ja";

export function tHelper<K extends string>(
    i18n: {
        [L in Lang]: {
            [k in K]: string;
        };
    },
) {
    return (key: K) => (i18n[lang][key] || "") as string;
}
