/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
export const protobufPackage = "eshelB.calculator.calculator";
const baseMsgCalculateSum = { creator: "", x: "", y: "" };
export const MsgCalculateSum = {
    encode(message, writer = Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCalculateSum };
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
    fromJSON(object) {
        const message = { ...baseMsgCalculateSum };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.x !== undefined && object.x !== null) {
            message.x = String(object.x);
        }
        else {
            message.x = "";
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = String(object.y);
        }
        else {
            message.y = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.x !== undefined && (obj.x = message.x);
        message.y !== undefined && (obj.y = message.y);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCalculateSum };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.x !== undefined && object.x !== null) {
            message.x = object.x;
        }
        else {
            message.x = "";
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = object.y;
        }
        else {
            message.y = "";
        }
        return message;
    },
};
const baseMsgCalculateSumResponse = {};
export const MsgCalculateSumResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCalculateSumResponse,
        };
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
    fromJSON(_) {
        const message = {
            ...baseMsgCalculateSumResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgCalculateSumResponse,
        };
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    CalculateSum(request) {
        const data = MsgCalculateSum.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Msg", "CalculateSum", data);
        return promise.then((data) => MsgCalculateSumResponse.decode(new Reader(data)));
    }
}
