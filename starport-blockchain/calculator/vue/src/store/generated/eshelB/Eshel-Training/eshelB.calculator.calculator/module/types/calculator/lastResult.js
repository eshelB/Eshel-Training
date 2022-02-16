/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "eshelB.calculator.calculator";
const baselastResult = { result: 0 };
export const lastResult = {
    encode(message, writer = Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(9).double(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baselastResult };
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
    fromJSON(object) {
        const message = { ...baselastResult };
        if (object.result !== undefined && object.result !== null) {
            message.result = Number(object.result);
        }
        else {
            message.result = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = message.result);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baselastResult };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = 0;
        }
        return message;
    },
};
