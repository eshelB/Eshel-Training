/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../calculator/params";

export const protobufPackage = "eshelB.calculator.calculator";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

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

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryAddRequest: object = { x: 0, y: 0 };

export const QueryAddRequest = {
  encode(message: QueryAddRequest, writer: Writer = Writer.create()): Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAddRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAddRequest } as QueryAddRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAddRequest {
    const message = { ...baseQueryAddRequest } as QueryAddRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = Number(object.x);
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = Number(object.y);
    } else {
      message.y = 0;
    }
    return message;
  },

  toJSON(message: QueryAddRequest): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAddRequest>): QueryAddRequest {
    const message = { ...baseQueryAddRequest } as QueryAddRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = 0;
    }
    return message;
  },
};

const baseQueryAddResponse: object = { result: 0 };

export const QueryAddResponse = {
  encode(message: QueryAddResponse, writer: Writer = Writer.create()): Writer {
    if (message.result !== 0) {
      writer.uint32(9).double(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAddResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAddResponse } as QueryAddResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAddResponse {
    const message = { ...baseQueryAddResponse } as QueryAddResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = Number(object.result);
    } else {
      message.result = 0;
    }
    return message;
  },

  toJSON(message: QueryAddResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAddResponse>): QueryAddResponse {
    const message = { ...baseQueryAddResponse } as QueryAddResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = 0;
    }
    return message;
  },
};

const baseQuerySubRequest: object = { x: 0, y: 0 };

export const QuerySubRequest = {
  encode(message: QuerySubRequest, writer: Writer = Writer.create()): Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySubRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySubRequest } as QuerySubRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySubRequest {
    const message = { ...baseQuerySubRequest } as QuerySubRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = Number(object.x);
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = Number(object.y);
    } else {
      message.y = 0;
    }
    return message;
  },

  toJSON(message: QuerySubRequest): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySubRequest>): QuerySubRequest {
    const message = { ...baseQuerySubRequest } as QuerySubRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = 0;
    }
    return message;
  },
};

const baseQuerySubResponse: object = { result: 0 };

export const QuerySubResponse = {
  encode(message: QuerySubResponse, writer: Writer = Writer.create()): Writer {
    if (message.result !== 0) {
      writer.uint32(9).double(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySubResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySubResponse } as QuerySubResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySubResponse {
    const message = { ...baseQuerySubResponse } as QuerySubResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = Number(object.result);
    } else {
      message.result = 0;
    }
    return message;
  },

  toJSON(message: QuerySubResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySubResponse>): QuerySubResponse {
    const message = { ...baseQuerySubResponse } as QuerySubResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = 0;
    }
    return message;
  },
};

const baseQueryMulRequest: object = { x: 0, y: 0 };

export const QueryMulRequest = {
  encode(message: QueryMulRequest, writer: Writer = Writer.create()): Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryMulRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryMulRequest } as QueryMulRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMulRequest {
    const message = { ...baseQueryMulRequest } as QueryMulRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = Number(object.x);
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = Number(object.y);
    } else {
      message.y = 0;
    }
    return message;
  },

  toJSON(message: QueryMulRequest): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryMulRequest>): QueryMulRequest {
    const message = { ...baseQueryMulRequest } as QueryMulRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = 0;
    }
    return message;
  },
};

const baseQueryMulResponse: object = { result: 0 };

export const QueryMulResponse = {
  encode(message: QueryMulResponse, writer: Writer = Writer.create()): Writer {
    if (message.result !== 0) {
      writer.uint32(9).double(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryMulResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryMulResponse } as QueryMulResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMulResponse {
    const message = { ...baseQueryMulResponse } as QueryMulResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = Number(object.result);
    } else {
      message.result = 0;
    }
    return message;
  },

  toJSON(message: QueryMulResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryMulResponse>): QueryMulResponse {
    const message = { ...baseQueryMulResponse } as QueryMulResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = 0;
    }
    return message;
  },
};

const baseQueryDivRequest: object = { x: 0, y: 0 };

export const QueryDivRequest = {
  encode(message: QueryDivRequest, writer: Writer = Writer.create()): Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDivRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDivRequest } as QueryDivRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDivRequest {
    const message = { ...baseQueryDivRequest } as QueryDivRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = Number(object.x);
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = Number(object.y);
    } else {
      message.y = 0;
    }
    return message;
  },

  toJSON(message: QueryDivRequest): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryDivRequest>): QueryDivRequest {
    const message = { ...baseQueryDivRequest } as QueryDivRequest;
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = 0;
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = 0;
    }
    return message;
  },
};

const baseQueryDivResponse: object = { result: 0 };

export const QueryDivResponse = {
  encode(message: QueryDivResponse, writer: Writer = Writer.create()): Writer {
    if (message.result !== 0) {
      writer.uint32(9).double(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDivResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDivResponse } as QueryDivResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDivResponse {
    const message = { ...baseQueryDivResponse } as QueryDivResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = Number(object.result);
    } else {
      message.result = 0;
    }
    return message;
  },

  toJSON(message: QueryDivResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryDivResponse>): QueryDivResponse {
    const message = { ...baseQueryDivResponse } as QueryDivResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = 0;
    }
    return message;
  },
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

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Add(request: QueryAddRequest): Promise<QueryAddResponse> {
    const data = QueryAddRequest.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Query",
      "Add",
      data
    );
    return promise.then((data) => QueryAddResponse.decode(new Reader(data)));
  }

  Sub(request: QuerySubRequest): Promise<QuerySubResponse> {
    const data = QuerySubRequest.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Query",
      "Sub",
      data
    );
    return promise.then((data) => QuerySubResponse.decode(new Reader(data)));
  }

  Mul(request: QueryMulRequest): Promise<QueryMulResponse> {
    const data = QueryMulRequest.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Query",
      "Mul",
      data
    );
    return promise.then((data) => QueryMulResponse.decode(new Reader(data)));
  }

  Div(request: QueryDivRequest): Promise<QueryDivResponse> {
    const data = QueryDivRequest.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Query",
      "Div",
      data
    );
    return promise.then((data) => QueryDivResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
