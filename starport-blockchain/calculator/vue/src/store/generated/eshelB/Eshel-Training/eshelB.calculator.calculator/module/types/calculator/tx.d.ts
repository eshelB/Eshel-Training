import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "eshelB.calculator.calculator";
export interface MsgCalculateSum {
    creator: string;
    x: string;
    y: string;
}
export interface MsgCalculateSumResponse {
}
export declare const MsgCalculateSum: {
    encode(message: MsgCalculateSum, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateSum;
    fromJSON(object: any): MsgCalculateSum;
    toJSON(message: MsgCalculateSum): unknown;
    fromPartial(object: DeepPartial<MsgCalculateSum>): MsgCalculateSum;
};
export declare const MsgCalculateSumResponse: {
    encode(_: MsgCalculateSumResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateSumResponse;
    fromJSON(_: any): MsgCalculateSumResponse;
    toJSON(_: MsgCalculateSumResponse): unknown;
    fromPartial(_: DeepPartial<MsgCalculateSumResponse>): MsgCalculateSumResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CalculateSum(request: MsgCalculateSum): Promise<MsgCalculateSumResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CalculateSum(request: MsgCalculateSum): Promise<MsgCalculateSumResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
