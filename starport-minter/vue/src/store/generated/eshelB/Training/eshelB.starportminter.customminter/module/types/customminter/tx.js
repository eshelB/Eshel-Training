/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
export const protobufPackage = "eshelB.starportminter.customminter";
const baseMsgMint = {
    creator: "",
    tokenName: "",
    quantity: 0,
    decimals: 0,
    receivingAddress: "",
};
export const MsgMint = {
    encode(message, writer = Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMint };
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
                    message.quantity = longToNumber(reader.uint64());
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
    fromJSON(object) {
        const message = { ...baseMsgMint };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.tokenName !== undefined && object.tokenName !== null) {
            message.tokenName = String(object.tokenName);
        }
        else {
            message.tokenName = "";
        }
        if (object.quantity !== undefined && object.quantity !== null) {
            message.quantity = Number(object.quantity);
        }
        else {
            message.quantity = 0;
        }
        if (object.decimals !== undefined && object.decimals !== null) {
            message.decimals = Number(object.decimals);
        }
        else {
            message.decimals = 0;
        }
        if (object.receivingAddress !== undefined &&
            object.receivingAddress !== null) {
            message.receivingAddress = String(object.receivingAddress);
        }
        else {
            message.receivingAddress = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.tokenName !== undefined && (obj.tokenName = message.tokenName);
        message.quantity !== undefined && (obj.quantity = message.quantity);
        message.decimals !== undefined && (obj.decimals = message.decimals);
        message.receivingAddress !== undefined &&
            (obj.receivingAddress = message.receivingAddress);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMint };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.tokenName !== undefined && object.tokenName !== null) {
            message.tokenName = object.tokenName;
        }
        else {
            message.tokenName = "";
        }
        if (object.quantity !== undefined && object.quantity !== null) {
            message.quantity = object.quantity;
        }
        else {
            message.quantity = 0;
        }
        if (object.decimals !== undefined && object.decimals !== null) {
            message.decimals = object.decimals;
        }
        else {
            message.decimals = 0;
        }
        if (object.receivingAddress !== undefined &&
            object.receivingAddress !== null) {
            message.receivingAddress = object.receivingAddress;
        }
        else {
            message.receivingAddress = "";
        }
        return message;
    },
};
const baseMsgMintResponse = { success: false };
export const MsgMintResponse = {
    encode(message, writer = Writer.create()) {
        if (message.success === true) {
            writer.uint32(8).bool(message.success);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintResponse };
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
    fromJSON(object) {
        const message = { ...baseMsgMintResponse };
        if (object.success !== undefined && object.success !== null) {
            message.success = Boolean(object.success);
        }
        else {
            message.success = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.success !== undefined && (obj.success = message.success);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintResponse };
        if (object.success !== undefined && object.success !== null) {
            message.success = object.success;
        }
        else {
            message.success = false;
        }
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Mint(request) {
        const data = MsgMint.encode(request).finish();
        const promise = this.rpc.request("eshelB.starportminter.customminter.Msg", "Mint", data);
        return promise.then((data) => MsgMintResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
