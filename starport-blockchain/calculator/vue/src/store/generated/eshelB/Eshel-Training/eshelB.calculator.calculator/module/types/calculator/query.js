/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../calculator/params";
export const protobufPackage = "eshelB.calculator.calculator";
const baseQueryParamsRequest = {};
export const QueryParamsRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsRequest };
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
        const message = { ...baseQueryParamsRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryParamsRequest };
        return message;
    },
};
const baseQueryParamsResponse = {};
export const QueryParamsResponse = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsResponse };
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
    fromJSON(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
};
const baseQueryAddRequest = { x: 0, y: 0 };
export const QueryAddRequest = {
    encode(message, writer = Writer.create()) {
        if (message.x !== 0) {
            writer.uint32(9).double(message.x);
        }
        if (message.y !== 0) {
            writer.uint32(17).double(message.y);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAddRequest };
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
    fromJSON(object) {
        const message = { ...baseQueryAddRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = Number(object.x);
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = Number(object.y);
        }
        else {
            message.y = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.x !== undefined && (obj.x = message.x);
        message.y !== undefined && (obj.y = message.y);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAddRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = object.x;
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = object.y;
        }
        else {
            message.y = 0;
        }
        return message;
    },
};
const baseQueryAddResponse = { result: 0 };
export const QueryAddResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(9).double(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAddResponse };
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
        const message = { ...baseQueryAddResponse };
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
        const message = { ...baseQueryAddResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = 0;
        }
        return message;
    },
};
const baseQuerySubRequest = { x: 0, y: 0 };
export const QuerySubRequest = {
    encode(message, writer = Writer.create()) {
        if (message.x !== 0) {
            writer.uint32(9).double(message.x);
        }
        if (message.y !== 0) {
            writer.uint32(17).double(message.y);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQuerySubRequest };
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
    fromJSON(object) {
        const message = { ...baseQuerySubRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = Number(object.x);
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = Number(object.y);
        }
        else {
            message.y = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.x !== undefined && (obj.x = message.x);
        message.y !== undefined && (obj.y = message.y);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQuerySubRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = object.x;
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = object.y;
        }
        else {
            message.y = 0;
        }
        return message;
    },
};
const baseQuerySubResponse = { result: 0 };
export const QuerySubResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(9).double(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQuerySubResponse };
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
        const message = { ...baseQuerySubResponse };
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
        const message = { ...baseQuerySubResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = 0;
        }
        return message;
    },
};
const baseQueryMulRequest = { x: 0, y: 0 };
export const QueryMulRequest = {
    encode(message, writer = Writer.create()) {
        if (message.x !== 0) {
            writer.uint32(9).double(message.x);
        }
        if (message.y !== 0) {
            writer.uint32(17).double(message.y);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryMulRequest };
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
    fromJSON(object) {
        const message = { ...baseQueryMulRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = Number(object.x);
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = Number(object.y);
        }
        else {
            message.y = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.x !== undefined && (obj.x = message.x);
        message.y !== undefined && (obj.y = message.y);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryMulRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = object.x;
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = object.y;
        }
        else {
            message.y = 0;
        }
        return message;
    },
};
const baseQueryMulResponse = { result: 0 };
export const QueryMulResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(9).double(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryMulResponse };
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
        const message = { ...baseQueryMulResponse };
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
        const message = { ...baseQueryMulResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = 0;
        }
        return message;
    },
};
const baseQueryDivRequest = { x: 0, y: 0 };
export const QueryDivRequest = {
    encode(message, writer = Writer.create()) {
        if (message.x !== 0) {
            writer.uint32(9).double(message.x);
        }
        if (message.y !== 0) {
            writer.uint32(17).double(message.y);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryDivRequest };
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
    fromJSON(object) {
        const message = { ...baseQueryDivRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = Number(object.x);
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = Number(object.y);
        }
        else {
            message.y = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.x !== undefined && (obj.x = message.x);
        message.y !== undefined && (obj.y = message.y);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryDivRequest };
        if (object.x !== undefined && object.x !== null) {
            message.x = object.x;
        }
        else {
            message.x = 0;
        }
        if (object.y !== undefined && object.y !== null) {
            message.y = object.y;
        }
        else {
            message.y = 0;
        }
        return message;
    },
};
const baseQueryDivResponse = { result: 0 };
export const QueryDivResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(9).double(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryDivResponse };
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
        const message = { ...baseQueryDivResponse };
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
        const message = { ...baseQueryDivResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = 0;
        }
        return message;
    },
};
const baseQueryGetLastResultRequest = {};
export const QueryGetLastResultRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetLastResultRequest,
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
            ...baseQueryGetLastResultRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryGetLastResultRequest,
        };
        return message;
    },
};
const baseQueryGetLastResultResponse = { result: 0 };
export const QueryGetLastResultResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(9).double(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetLastResultResponse,
        };
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
        const message = {
            ...baseQueryGetLastResultResponse,
        };
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
        const message = {
            ...baseQueryGetLastResultResponse,
        };
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = 0;
        }
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
    }
    Add(request) {
        const data = QueryAddRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Query", "Add", data);
        return promise.then((data) => QueryAddResponse.decode(new Reader(data)));
    }
    Sub(request) {
        const data = QuerySubRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Query", "Sub", data);
        return promise.then((data) => QuerySubResponse.decode(new Reader(data)));
    }
    Mul(request) {
        const data = QueryMulRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Query", "Mul", data);
        return promise.then((data) => QueryMulResponse.decode(new Reader(data)));
    }
    Div(request) {
        const data = QueryDivRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Query", "Div", data);
        return promise.then((data) => QueryDivResponse.decode(new Reader(data)));
    }
    GetLastResult(request) {
        const data = QueryGetLastResultRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.calculator.calculator.Query", "GetLastResult", data);
        return promise.then((data) => QueryGetLastResultResponse.decode(new Reader(data)));
    }
}
