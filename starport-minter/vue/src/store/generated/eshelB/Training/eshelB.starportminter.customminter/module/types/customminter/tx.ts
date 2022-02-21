/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "eshelB.starportminter.customminter";

export interface MsgMint {
  creator: string;
  tokenName: string;
  quantity: number;
  decimals: number;
  receivingAddress: string;
}

export interface MsgMintResponse {
  success: boolean;
}

const baseMsgMint: object = {
  creator: "",
  tokenName: "",
  quantity: 0,
  decimals: 0,
  receivingAddress: "",
};

export const MsgMint = {
  encode(message: MsgMint, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.tokenName !== "") {
      writer.uint32(18).string(message.tokenName);
    }
    if (message.quantity !== 0) {
      writer.uint32(24).uint64(message.quantity);
    }
    if (message.decimals !== 0) {
      writer.uint32(32).uint32(message.decimals);
    }
    if (message.receivingAddress !== "") {
      writer.uint32(42).string(message.receivingAddress);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMint {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMint } as MsgMint;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.tokenName = reader.string();
          break;
        case 3:
          message.quantity = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.decimals = reader.uint32();
          break;
        case 5:
          message.receivingAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMint {
    const message = { ...baseMsgMint } as MsgMint;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.tokenName !== undefined && object.tokenName !== null) {
      message.tokenName = String(object.tokenName);
    } else {
      message.tokenName = "";
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = Number(object.quantity);
    } else {
      message.quantity = 0;
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = Number(object.decimals);
    } else {
      message.decimals = 0;
    }
    if (
      object.receivingAddress !== undefined &&
      object.receivingAddress !== null
    ) {
      message.receivingAddress = String(object.receivingAddress);
    } else {
      message.receivingAddress = "";
    }
    return message;
  },

  toJSON(message: MsgMint): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.tokenName !== undefined && (obj.tokenName = message.tokenName);
    message.quantity !== undefined && (obj.quantity = message.quantity);
    message.decimals !== undefined && (obj.decimals = message.decimals);
    message.receivingAddress !== undefined &&
      (obj.receivingAddress = message.receivingAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMint>): MsgMint {
    const message = { ...baseMsgMint } as MsgMint;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.tokenName !== undefined && object.tokenName !== null) {
      message.tokenName = object.tokenName;
    } else {
      message.tokenName = "";
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = object.quantity;
    } else {
      message.quantity = 0;
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = object.decimals;
    } else {
      message.decimals = 0;
    }
    if (
      object.receivingAddress !== undefined &&
      object.receivingAddress !== null
    ) {
      message.receivingAddress = object.receivingAddress;
    } else {
      message.receivingAddress = "";
    }
    return message;
  },
};

const baseMsgMintResponse: object = { success: false };

export const MsgMintResponse = {
  encode(message: MsgMintResponse, writer: Writer = Writer.create()): Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMintResponse } as MsgMintResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintResponse {
    const message = { ...baseMsgMintResponse } as MsgMintResponse;
    if (object.success !== undefined && object.success !== null) {
      message.success = Boolean(object.success);
    } else {
      message.success = false;
    }
    return message;
  },

  toJSON(message: MsgMintResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMintResponse>): MsgMintResponse {
    const message = { ...baseMsgMintResponse } as MsgMintResponse;
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    } else {
      message.success = false;
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Mint(request: MsgMint): Promise<MsgMintResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Mint(request: MsgMint): Promise<MsgMintResponse> {
    const data = MsgMint.encode(request).finish();
    const promise = this.rpc.request(
      "eshelB.starportminter.customminter.Msg",
      "Mint",
      data
    );
    return promise.then((data) => MsgMintResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
