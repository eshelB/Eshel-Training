import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "eshelB.calculator.calculator";
export interface lastResult {
    result: number;
}
export declare const lastResult: {
    encode(message: lastResult, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): lastResult;
    fromJSON(object: any): lastResult;
    toJSON(message: lastResult): unknown;
    fromPartial(object: DeepPartial<lastResult>): lastResult;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
