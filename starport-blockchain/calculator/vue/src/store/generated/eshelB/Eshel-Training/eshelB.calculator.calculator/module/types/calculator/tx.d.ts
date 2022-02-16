import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "eshelB.calculator.calculator";
export interface MsgCalculateSum {
    creator: string;
    x: string;
    y: string;
}
export interface MsgCalculateSumResponse {
    result: string;
}
export interface MsgCalculateMul {
    creator: string;
    x: string;
    y: string;
}
export interface MsgCalculateMulResponse {
    result: string;
}
export interface MsgCalculateDiv {
    creator: string;
    x: string;
    y: string;
}
export interface MsgCalculateDivResponse {
    result: string;
}
export interface MsgCalculateSub {
    creator: string;
    x: string;
    y: string;
}
export interface MsgCalculateSubResponse {
    result: string;
}
export declare const MsgCalculateSum: {
    encode(message: MsgCalculateSum, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateSum;
    fromJSON(object: any): MsgCalculateSum;
    toJSON(message: MsgCalculateSum): unknown;
    fromPartial(object: DeepPartial<MsgCalculateSum>): MsgCalculateSum;
};
export declare const MsgCalculateSumResponse: {
    encode(message: MsgCalculateSumResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateSumResponse;
    fromJSON(object: any): MsgCalculateSumResponse;
    toJSON(message: MsgCalculateSumResponse): unknown;
    fromPartial(object: DeepPartial<MsgCalculateSumResponse>): MsgCalculateSumResponse;
};
export declare const MsgCalculateMul: {
    encode(message: MsgCalculateMul, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateMul;
    fromJSON(object: any): MsgCalculateMul;
    toJSON(message: MsgCalculateMul): unknown;
    fromPartial(object: DeepPartial<MsgCalculateMul>): MsgCalculateMul;
};
export declare const MsgCalculateMulResponse: {
    encode(message: MsgCalculateMulResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateMulResponse;
    fromJSON(object: any): MsgCalculateMulResponse;
    toJSON(message: MsgCalculateMulResponse): unknown;
    fromPartial(object: DeepPartial<MsgCalculateMulResponse>): MsgCalculateMulResponse;
};
export declare const MsgCalculateDiv: {
    encode(message: MsgCalculateDiv, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateDiv;
    fromJSON(object: any): MsgCalculateDiv;
    toJSON(message: MsgCalculateDiv): unknown;
    fromPartial(object: DeepPartial<MsgCalculateDiv>): MsgCalculateDiv;
};
export declare const MsgCalculateDivResponse: {
    encode(message: MsgCalculateDivResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateDivResponse;
    fromJSON(object: any): MsgCalculateDivResponse;
    toJSON(message: MsgCalculateDivResponse): unknown;
    fromPartial(object: DeepPartial<MsgCalculateDivResponse>): MsgCalculateDivResponse;
};
export declare const MsgCalculateSub: {
    encode(message: MsgCalculateSub, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateSub;
    fromJSON(object: any): MsgCalculateSub;
    toJSON(message: MsgCalculateSub): unknown;
    fromPartial(object: DeepPartial<MsgCalculateSub>): MsgCalculateSub;
};
export declare const MsgCalculateSubResponse: {
    encode(message: MsgCalculateSubResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCalculateSubResponse;
    fromJSON(object: any): MsgCalculateSubResponse;
    toJSON(message: MsgCalculateSubResponse): unknown;
    fromPartial(object: DeepPartial<MsgCalculateSubResponse>): MsgCalculateSubResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    CalculateSum(request: MsgCalculateSum): Promise<MsgCalculateSumResponse>;
    CalculateMul(request: MsgCalculateMul): Promise<MsgCalculateMulResponse>;
    CalculateDiv(request: MsgCalculateDiv): Promise<MsgCalculateDivResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    CalculateSub(request: MsgCalculateSub): Promise<MsgCalculateSubResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CalculateSum(request: MsgCalculateSum): Promise<MsgCalculateSumResponse>;
    CalculateMul(request: MsgCalculateMul): Promise<MsgCalculateMulResponse>;
    CalculateDiv(request: MsgCalculateDiv): Promise<MsgCalculateDivResponse>;
    CalculateSub(request: MsgCalculateSub): Promise<MsgCalculateSubResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
