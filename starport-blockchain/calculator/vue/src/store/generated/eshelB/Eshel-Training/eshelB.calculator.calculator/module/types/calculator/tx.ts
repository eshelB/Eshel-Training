/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "eshelB.calculator.calculator";

export interface MsgCalculateSum {
  creator: string;
  x: string;
  y: string;
}

export interface MsgCalculateSumResponse {}

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

const baseMsgCalculateSumResponse: object = {};

export const MsgCalculateSumResponse = {
  encode(_: MsgCalculateSumResponse, writer: Writer = Writer.create()): Writer {
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCalculateSumResponse {
    const message = {
      ...baseMsgCalculateSumResponse,
    } as MsgCalculateSumResponse;
    return message;
  },

  toJSON(_: MsgCalculateSumResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCalculateSumResponse>
  ): MsgCalculateSumResponse {
    const message = {
      ...baseMsgCalculateSumResponse,
    } as MsgCalculateSumResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CalculateSum(request: MsgCalculateSum): Promise<MsgCalculateSumResponse>;
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
