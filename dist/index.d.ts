declare function sortObject<T extends Record<string, unknown>>(obj: T, options?: {
    deep?: boolean;
}): T;
declare function sortArray<T extends any[]>(array: T, options?: {
    deep?: boolean;
}): T;
declare function sha256(payload: any, options?: {
    sort?: boolean;
    deepSort?: boolean;
}): Promise<string>;

export { sha256, sortArray, sortObject };
