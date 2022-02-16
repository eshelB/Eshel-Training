import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../calculator/params";
export declare const protobufPackage = "eshelB.calculator.calculator";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryAddRequest {
    x: number;
    y: number;
}
export interface QueryAddResponse {
    result: number;
}
export interface QuerySubRequest {
    x: number;
    y: number;
}
export interface QuerySubResponse {
    result: number;
}
export interface QueryMulRequest {
    x: number;
    y: number;
}
export interface QueryMulResponse {
    result: number;
}
export interface QueryDivRequest {
    x: number;
    y: number;
}
export interface QueryDivResponse {
    result: number;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryAddRequest: {
    encode(message: QueryAddRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAddRequest;
    fromJSON(object: any): QueryAddRequest;
    toJSON(message: QueryAddRequest): unknown;
    fromPartial(object: DeepPartial<QueryAddRequest>): QueryAddRequest;
};
export declare const QueryAddResponse: {
    encode(message: QueryAddResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAddResponse;
    fromJSON(object: any): QueryAddResponse;
    toJSON(message: QueryAddResponse): unknown;
    fromPartial(object: DeepPartial<QueryAddResponse>): QueryAddResponse;
};
export declare const QuerySubRequest: {
    encode(message: QuerySubRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QuerySubRequest;
    fromJSON(object: any): QuerySubRequest;
    toJSON(message: QuerySubRequest): unknown;
    fromPartial(object: DeepPartial<QuerySubRequest>): QuerySubRequest;
};
export declare const QuerySubResponse: {
    encode(message: QuerySubResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QuerySubResponse;
    fromJSON(object: any): QuerySubResponse;
    toJSON(message: QuerySubResponse): unknown;
    fromPartial(object: DeepPartial<QuerySubResponse>): QuerySubResponse;
};
export declare const QueryMulRequest: {
    encode(message: QueryMulRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryMulRequest;
    fromJSON(object: any): QueryMulRequest;
    toJSON(message: QueryMulRequest): unknown;
    fromPartial(object: DeepPartial<QueryMulRequest>): QueryMulRequest;
};
export declare const QueryMulResponse: {
    encode(message: QueryMulResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryMulResponse;
    fromJSON(object: any): QueryMulResponse;
    toJSON(message: QueryMulResponse): unknown;
    fromPartial(object: DeepPartial<QueryMulResponse>): QueryMulResponse;
};
export declare const QueryDivRequest: {
    encode(message: QueryDivRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDivRequest;
    fromJSON(object: any): QueryDivRequest;
    toJSON(message: QueryDivRequest): unknown;
    fromPartial(object: DeepPartial<QueryDivRequest>): QueryDivRequest;
};
export declare const QueryDivResponse: {
    encode(message: QueryDivResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDivResponse;
    fromJSON(object: any): QueryDivResponse;
    toJSON(message: QueryDivResponse): unknown;
    fromPartial(object: DeepPartial<QueryDivResponse>): QueryDivResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries the result of a math operation */
    Add(request: QueryAddRequest): Promise<QueryAddResponse>;
    /** Queries the result of a math operation */
    Sub(request: QuerySubRequest): Promise<QuerySubResponse>;
    /** Queries the result of a math operation */
    Mul(request: QueryMulRequest): Promise<QueryMulResponse>;
    /** Queries the result of a math operation */
    Div(request: QueryDivRequest): Promise<QueryDivResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Add(request: QueryAddRequest): Promise<QueryAddResponse>;
    Sub(request: QuerySubRequest): Promise<QuerySubResponse>;
    Mul(request: QueryMulRequest): Promise<QueryMulResponse>;
    Div(request: QueryDivRequest): Promise<QueryDivResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
