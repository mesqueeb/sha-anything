export declare function sortObject<T extends {
    [key in string]: unknown;
}>(obj: T, options?: {
    deep?: boolean;
}): T;
export declare function sortArray<T extends any[]>(array: T, options?: {
    deep?: boolean;
}): T;
export declare function sha256(payload: any, options?: {
    sort?: boolean;
    deepSort?: boolean;
}): Promise<string>;
