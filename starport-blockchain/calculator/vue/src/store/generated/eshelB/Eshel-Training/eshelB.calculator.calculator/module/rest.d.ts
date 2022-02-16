export interface CalculatorMsgCalculateDivResponse {
    result?: string;
}
export interface CalculatorMsgCalculateMulResponse {
    result?: string;
}
export interface CalculatorMsgCalculateSubResponse {
    result?: string;
}
export interface CalculatorMsgCalculateSumResponse {
    result?: string;
}
/**
 * Params defines the parameters for the module.
 */
export declare type CalculatorParams = object;
export interface CalculatorQueryAddResponse {
    /** @format double */
    result?: number;
}
export interface CalculatorQueryDivResponse {
    /** @format double */
    result?: number;
}
export interface CalculatorQueryGetLastResultResponse {
    /** @format double */
    result?: number;
}
export interface CalculatorQueryMulResponse {
    /** @format double */
    result?: number;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface CalculatorQueryParamsResponse {
    /** params holds all the parameters of this module. */
    params?: CalculatorParams;
}
export interface CalculatorQuerySubResponse {
    /** @format double */
    result?: number;
}
export interface ProtobufAny {
    "@type"?: string;
}
export interface RpcStatus {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: ProtobufAny[];
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: keyof Omit<Body, "body" | "bodyUsed">;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker;
    private abortControllers;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType) => void;
    private addQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title calculator/genesis.proto
 * @version version not set
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryAdd
     * @summary Queries the result of a math operation
     * @request GET:/eshelB/calculator/calculator/add
     */
    queryAdd: (query?: {
        x?: number;
        y?: number;
    }, params?: RequestParams) => Promise<HttpResponse<CalculatorQueryAddResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDiv
     * @summary Queries the result of a math operation
     * @request GET:/eshelB/calculator/calculator/div
     */
    queryDiv: (query?: {
        x?: number;
        y?: number;
    }, params?: RequestParams) => Promise<HttpResponse<CalculatorQueryDivResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGetLastResult
     * @summary Queries a list of GetLastResult items.
     * @request GET:/eshelB/calculator/calculator/get_last_result
     */
    queryGetLastResult: (params?: RequestParams) => Promise<HttpResponse<CalculatorQueryGetLastResultResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryMul
     * @summary Queries the result of a math operation
     * @request GET:/eshelB/calculator/calculator/mul
     */
    queryMul: (query?: {
        x?: number;
        y?: number;
    }, params?: RequestParams) => Promise<HttpResponse<CalculatorQueryMulResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @summary Parameters queries the parameters of the module.
     * @request GET:/eshelB/calculator/calculator/params
     */
    queryParams: (params?: RequestParams) => Promise<HttpResponse<CalculatorQueryParamsResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySub
     * @summary Queries the result of a math operation
     * @request GET:/eshelB/calculator/calculator/sub
     */
    querySub: (query?: {
        x?: number;
        y?: number;
    }, params?: RequestParams) => Promise<HttpResponse<CalculatorQuerySubResponse, RpcStatus>>;
}
export {};
