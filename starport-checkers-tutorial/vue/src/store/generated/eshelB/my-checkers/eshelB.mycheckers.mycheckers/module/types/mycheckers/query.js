/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../mycheckers/params";
import { NextGame } from "../mycheckers/next_game";
import { StoredGame } from "../mycheckers/stored_game";
import { PageRequest, PageResponse, } from "../cosmos/base/query/v1beta1/pagination";
export const protobufPackage = "eshelB.mycheckers.mycheckers";
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
const baseQueryGetNextGameRequest = {};
export const QueryGetNextGameRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetNextGameRequest,
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
            ...baseQueryGetNextGameRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryGetNextGameRequest,
        };
        return message;
    },
};
const baseQueryGetNextGameResponse = {};
export const QueryGetNextGameResponse = {
    encode(message, writer = Writer.create()) {
        if (message.NextGame !== undefined) {
            NextGame.encode(message.NextGame, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetNextGameResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.NextGame = NextGame.decode(reader, reader.uint32());
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
            ...baseQueryGetNextGameResponse,
        };
        if (object.NextGame !== undefined && object.NextGame !== null) {
            message.NextGame = NextGame.fromJSON(object.NextGame);
        }
        else {
            message.NextGame = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.NextGame !== undefined &&
            (obj.NextGame = message.NextGame
                ? NextGame.toJSON(message.NextGame)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetNextGameResponse,
        };
        if (object.NextGame !== undefined && object.NextGame !== null) {
            message.NextGame = NextGame.fromPartial(object.NextGame);
        }
        else {
            message.NextGame = undefined;
        }
        return message;
    },
};
const baseQueryGetStoredGameRequest = { index: "" };
export const QueryGetStoredGameRequest = {
    encode(message, writer = Writer.create()) {
        if (message.index !== "") {
            writer.uint32(10).string(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetStoredGameRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.string();
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
            ...baseQueryGetStoredGameRequest,
        };
        if (object.index !== undefined && object.index !== null) {
            message.index = String(object.index);
        }
        else {
            message.index = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetStoredGameRequest,
        };
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = "";
        }
        return message;
    },
};
const baseQueryGetStoredGameResponse = {};
export const QueryGetStoredGameResponse = {
    encode(message, writer = Writer.create()) {
        if (message.storedGame !== undefined) {
            StoredGame.encode(message.storedGame, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetStoredGameResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.storedGame = StoredGame.decode(reader, reader.uint32());
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
            ...baseQueryGetStoredGameResponse,
        };
        if (object.storedGame !== undefined && object.storedGame !== null) {
            message.storedGame = StoredGame.fromJSON(object.storedGame);
        }
        else {
            message.storedGame = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.storedGame !== undefined &&
            (obj.storedGame = message.storedGame
                ? StoredGame.toJSON(message.storedGame)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetStoredGameResponse,
        };
        if (object.storedGame !== undefined && object.storedGame !== null) {
            message.storedGame = StoredGame.fromPartial(object.storedGame);
        }
        else {
            message.storedGame = undefined;
        }
        return message;
    },
};
const baseQueryAllStoredGameRequest = {};
export const QueryAllStoredGameRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllStoredGameRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
            ...baseQueryAllStoredGameRequest,
        };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllStoredGameRequest,
        };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllStoredGameResponse = {};
export const QueryAllStoredGameResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.storedGame) {
            StoredGame.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllStoredGameResponse,
        };
        message.storedGame = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.storedGame.push(StoredGame.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            ...baseQueryAllStoredGameResponse,
        };
        message.storedGame = [];
        if (object.storedGame !== undefined && object.storedGame !== null) {
            for (const e of object.storedGame) {
                message.storedGame.push(StoredGame.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.storedGame) {
            obj.storedGame = message.storedGame.map((e) => e ? StoredGame.toJSON(e) : undefined);
        }
        else {
            obj.storedGame = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllStoredGameResponse,
        };
        message.storedGame = [];
        if (object.storedGame !== undefined && object.storedGame !== null) {
            for (const e of object.storedGame) {
                message.storedGame.push(StoredGame.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
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
        const promise = this.rpc.request("eshelB.mycheckers.mycheckers.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
    }
    NextGame(request) {
        const data = QueryGetNextGameRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.mycheckers.mycheckers.Query", "NextGame", data);
        return promise.then((data) => QueryGetNextGameResponse.decode(new Reader(data)));
    }
    StoredGame(request) {
        const data = QueryGetStoredGameRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.mycheckers.mycheckers.Query", "StoredGame", data);
        return promise.then((data) => QueryGetStoredGameResponse.decode(new Reader(data)));
    }
    StoredGameAll(request) {
        const data = QueryAllStoredGameRequest.encode(request).finish();
        const promise = this.rpc.request("eshelB.mycheckers.mycheckers.Query", "StoredGameAll", data);
        return promise.then((data) => QueryAllStoredGameResponse.decode(new Reader(data)));
    }
}
