/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "eshelB.calculator.calculator";

export interface lastResult {
  result: number;
}

const baselastResult: object = { result: 0 };

export const lastResult = {
  encode(message: lastResult, writer: Writer = Writer.create()): Writer {
    if (message.result !== 0) {
      writer.uint32(9).double(message.result);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): lastResult {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baselastResult } as lastResult;
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

  fromJSON(object: any): lastResult {
    const message = { ...baselastResult } as lastResult;
    if (object.result !== undefined && object.result !== null) {
      message.result = Number(object.result);
    } else {
      message.result = 0;
    }
    return message;
  },

  toJSON(message: lastResult): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    return obj;
  },

  fromPartial(object: DeepPartial<lastResult>): lastResult {
    const message = { ...baselastResult } as lastResult;
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result;
    } else {
      message.result = 0;
    }
    return message;
  },
};

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
