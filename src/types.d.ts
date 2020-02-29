interface CedictEntry {
    trad: string;
    simp: string;
    pinyin: string;
    def: string;
}

interface SearchCondition {
    prop: string;
    method: string;
    arg: string;
}

type urlString = string;

declare module '*.ttf' {
    const content: urlString;
    export default content;
}

declare module '*.tsv' {
    const content: urlString;
    export default content;
}
