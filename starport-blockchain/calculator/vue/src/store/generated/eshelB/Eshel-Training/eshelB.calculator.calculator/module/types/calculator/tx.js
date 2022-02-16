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
const baseMsgCalculateSumResponse = { result: "" };
export const MsgCalculateSumResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== "") {
            writer.uint32(10).string(message.result);
        }
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
    fromJSON(object) {
        const message = {
            ...baseMsgCalculateSumResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = String(object.result);
        }
        else {
            message.result = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = message.result);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCalculateSumResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = "";
        }
        return message;
    },
};
const baseMsgCalculateMul = { creator: "", x: "", y: "" };
export const MsgCalculateMul = {
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
        const message = { ...baseMsgCalculateMul };
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
        const message = { ...baseMsgCalculateMul };
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
        const message = { ...baseMsgCalculateMul };
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
const baseMsgCalculateMulResponse = { result: "" };
export const MsgCalculateMulResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== "") {
            writer.uint32(10).string(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCalculateMulResponse,
        };
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
    fromJSON(object) {
        const message = {
            ...baseMsgCalculateMulResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = String(object.result);
        }
        else {
            message.result = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = message.result);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCalculateMulResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = "";
        }
        return message;
    },
};
const baseMsgCalculateDiv = { creator: "", x: "", y: "" };
export const MsgCalculateDiv = {
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
        const message = { ...baseMsgCalculateDiv };
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
        const message = { ...baseMsgCalculateDiv };
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
        const message = { ...baseMsgCalculateDiv };
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
const baseMsgCalculateDivResponse = { result: "" };
export const MsgCalculateDivResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== "") {
            writer.uint32(10).string(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCalculateDivResponse,
        };
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
    fromJSON(object) {
        const message = {
            ...baseMsgCalculateDivResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = String(object.result);
        }
        else {
            message.result = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = message.result);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCalculateDivResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = "";
        }
        return message;
    },
};
const baseMsgCalculateSub = { creator: "", x: "", y: "" };
export const MsgCalculateSub = {
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
        const message = { ...baseMsgCalculateSub };
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
        const message = { ...baseMsgCalculateSub };
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
        const message = { ...baseMsgCalculateSub };
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
const baseMsgCalculateSubResponse = { result: "" };
export const MsgCalculateSubResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== "") {
            writer.uint32(10).string(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCalculateSubResponse,
        };
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
    fromJSON(object) {
        const message = {
            ...baseMsgCalculateSubResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = String(object.result);
        }
        else {
            message.result = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = message.result);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCalculateSubResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = "";
        }
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
    CalculateMul(request) {
        const data = MsgCalculateMul.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Msg", "CalculateMul", data);
        return promise.then((data) => MsgCalculateMulResponse.decode(new Reader(data)));
    }
    CalculateDiv(request) {
        const data = MsgCalculateDiv.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Msg", "CalculateDiv", data);
        return promise.then((data) => MsgCalculateDivResponse.decode(new Reader(data)));
    }
    CalculateSub(request) {
        const data = MsgCalculateSub.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Msg", "CalculateSub", data);
        return promise.then((data) => MsgCalculateSubResponse.decode(new Reader(data)));
    }
}
