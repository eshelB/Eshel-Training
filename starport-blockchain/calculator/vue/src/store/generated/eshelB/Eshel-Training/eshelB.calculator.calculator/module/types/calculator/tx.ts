/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "eshelB.calculator.calculator";

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

const baseMsgCalculateSum: object = { creator: "", x: "", y: "" };

export const MsgCalculateSum = {
  encode(message: MsgCalculateSum, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.x !== "") {
      writer.uint32(18).string(message.x);
    }
    if (message.y !== "") {
      writer.uint32(26).string(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateSum {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCalculateSum } as MsgCalculateSum;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.x = reader.string();
          break;
        case 3:
          message.y = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateSum {
    const message = { ...baseMsgCalculateSum } as MsgCalculateSum;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = String(object.x);
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = String(object.y);
    } else {
      message.y = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateSum): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCalculateSum>): MsgCalculateSum {
    const message = { ...baseMsgCalculateSum } as MsgCalculateSum;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = "";
    }
    return message;
  },
};

const baseMsgCalculateSumResponse: object = { result: "" };

export const MsgCalculateSumResponse = {
  encode(
    message: MsgCalculateSumResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.result !== "") {
      writer.uint32(10).string(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateSumResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCalculateSumResponse,
    } as MsgCalculateSumResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateSumResponse {
    const message = {
      ...baseMsgCalculateSumResponse,
    } as MsgCalculateSumResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = String(object.result);
    } else {
      message.result = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateSumResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCalculateSumResponse>
  ): MsgCalculateSumResponse {
    const message = {
      ...baseMsgCalculateSumResponse,
    } as MsgCalculateSumResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = "";
    }
    return message;
  },
};

const baseMsgCalculateMul: object = { creator: "", x: "", y: "" };

export const MsgCalculateMul = {
  encode(message: MsgCalculateMul, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.x !== "") {
      writer.uint32(18).string(message.x);
    }
    if (message.y !== "") {
      writer.uint32(26).string(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateMul {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCalculateMul } as MsgCalculateMul;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.x = reader.string();
          break;
        case 3:
          message.y = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateMul {
    const message = { ...baseMsgCalculateMul } as MsgCalculateMul;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = String(object.x);
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = String(object.y);
    } else {
      message.y = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateMul): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCalculateMul>): MsgCalculateMul {
    const message = { ...baseMsgCalculateMul } as MsgCalculateMul;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = "";
    }
    return message;
  },
};

const baseMsgCalculateMulResponse: object = { result: "" };

export const MsgCalculateMulResponse = {
  encode(
    message: MsgCalculateMulResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.result !== "") {
      writer.uint32(10).string(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateMulResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCalculateMulResponse,
    } as MsgCalculateMulResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateMulResponse {
    const message = {
      ...baseMsgCalculateMulResponse,
    } as MsgCalculateMulResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = String(object.result);
    } else {
      message.result = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateMulResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCalculateMulResponse>
  ): MsgCalculateMulResponse {
    const message = {
      ...baseMsgCalculateMulResponse,
    } as MsgCalculateMulResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = "";
    }
    return message;
  },
};

const baseMsgCalculateDiv: object = { creator: "", x: "", y: "" };

export const MsgCalculateDiv = {
  encode(message: MsgCalculateDiv, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.x !== "") {
      writer.uint32(18).string(message.x);
    }
    if (message.y !== "") {
      writer.uint32(26).string(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateDiv {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCalculateDiv } as MsgCalculateDiv;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.x = reader.string();
          break;
        case 3:
          message.y = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateDiv {
    const message = { ...baseMsgCalculateDiv } as MsgCalculateDiv;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = String(object.x);
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = String(object.y);
    } else {
      message.y = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateDiv): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCalculateDiv>): MsgCalculateDiv {
    const message = { ...baseMsgCalculateDiv } as MsgCalculateDiv;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = "";
    }
    return message;
  },
};

const baseMsgCalculateDivResponse: object = { result: "" };

export const MsgCalculateDivResponse = {
  encode(
    message: MsgCalculateDivResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.result !== "") {
      writer.uint32(10).string(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateDivResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCalculateDivResponse,
    } as MsgCalculateDivResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateDivResponse {
    const message = {
      ...baseMsgCalculateDivResponse,
    } as MsgCalculateDivResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = String(object.result);
    } else {
      message.result = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateDivResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCalculateDivResponse>
  ): MsgCalculateDivResponse {
    const message = {
      ...baseMsgCalculateDivResponse,
    } as MsgCalculateDivResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = "";
    }
    return message;
  },
};

const baseMsgCalculateSub: object = { creator: "", x: "", y: "" };

export const MsgCalculateSub = {
  encode(message: MsgCalculateSub, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.x !== "") {
      writer.uint32(18).string(message.x);
    }
    if (message.y !== "") {
      writer.uint32(26).string(message.y);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateSub {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCalculateSub } as MsgCalculateSub;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.x = reader.string();
          break;
        case 3:
          message.y = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateSub {
    const message = { ...baseMsgCalculateSub } as MsgCalculateSub;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = String(object.x);
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = String(object.y);
    } else {
      message.y = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateSub): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCalculateSub>): MsgCalculateSub {
    const message = { ...baseMsgCalculateSub } as MsgCalculateSub;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.x !== undefined && object.x !== null) {
      message.x = object.x;
    } else {
      message.x = "";
    }
    if (object.y !== undefined && object.y !== null) {
      message.y = object.y;
    } else {
      message.y = "";
    }
    return message;
  },
};

const baseMsgCalculateSubResponse: object = { result: "" };

export const MsgCalculateSubResponse = {
  encode(
    message: MsgCalculateSubResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.result !== "") {
      writer.uint32(10).string(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCalculateSubResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCalculateSubResponse,
    } as MsgCalculateSubResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCalculateSubResponse {
    const message = {
      ...baseMsgCalculateSubResponse,
    } as MsgCalculateSubResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = String(object.result);
    } else {
      message.result = "";
    }
    return message;
  },

  toJSON(message: MsgCalculateSubResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCalculateSubResponse>
  ): MsgCalculateSubResponse {
    const message = {
      ...baseMsgCalculateSubResponse,
    } as MsgCalculateSubResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = "";
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CalculateSum(request: MsgCalculateSum): Promise<MsgCalculateSumResponse>;
  CalculateMul(request: MsgCalculateMul): Promise<MsgCalculateMulResponse>;
  CalculateDiv(request: MsgCalculateDiv): Promise<MsgCalculateDivResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CalculateSub(request: MsgCalculateSub): Promise<MsgCalculateSubResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CalculateSum(request: MsgCalculateSum): Promise<MsgCalculateSumResponse> {
    const data = MsgCalculateSum.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Msg",
      "CalculateSum",
      data
    );
    return promise.then((data) =>
      MsgCalculateSumResponse.decode(new Reader(data))
    );
  }

  CalculateMul(request: MsgCalculateMul): Promise<MsgCalculateMulResponse> {
    const data = MsgCalculateMul.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Msg",
      "CalculateMul",
      data
    );
    return promise.then((data) =>
      MsgCalculateMulResponse.decode(new Reader(data))
    );
  }

  CalculateDiv(request: MsgCalculateDiv): Promise<MsgCalculateDivResponse> {
    const data = MsgCalculateDiv.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Msg",
      "CalculateDiv",
      data
    );
    return promise.then((data) =>
      MsgCalculateDivResponse.decode(new Reader(data))
    );
  }

  CalculateSub(request: MsgCalculateSub): Promise<MsgCalculateSubResponse> {
    const data = MsgCalculateSub.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.calculator.calculator.Msg",
      "CalculateSub",
      data
    );
    return promise.then((data) =>
      MsgCalculateSubResponse.decode(new Reader(data))
    );
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
