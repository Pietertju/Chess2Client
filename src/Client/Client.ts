//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

import { ProfileData } from "../Models/ProfileData";
import { JWTBase } from "./JWTBase";

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export interface IClient {

    /**
     * @return Success
     */
    getUsers(): Promise<GetUsersResponse>;

    /**
     * @return Success
     */
    checkLogin(): Promise<IsLoggedInResponse>;

    /**
     * @param body (optional) 
     * @return Success
     */
    login(body?: LoginModel | undefined): Promise<LoginResponse>;

    /**
     * @param body (optional) 
     * @return Success
     */
    registerUser(body?: RegisterModel | undefined): Promise<AuthenticationResponse>;

    /**
     * @param body (optional) 
     * @return Success
     */
    registerAdmin(body?: RegisterModel | undefined): Promise<AuthenticationResponse>;
}

export class Client extends JWTBase implements IClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getUsers(): Promise<GetUsersResponse> {
        let url_ = this.baseUrl + "/api/Authenticate/getUsers";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processGetUsers(_response));
        });
    }

    protected processGetUsers(response: Response): Promise<GetUsersResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as GetUsersResponse;
            return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            result404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthenticationResponse;
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetUsersResponse>(null as any);
    }

    /**
     * @return Success
     */
    checkLogin(): Promise<IsLoggedInResponse> {
        let url_ = this.baseUrl + "/api/Authenticate/checkLogin";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processCheckLogin(_response));
        });
    }

    protected processCheckLogin(response: Response): Promise<IsLoggedInResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as IsLoggedInResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<IsLoggedInResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    login(body?: LoginModel | undefined): Promise<LoginResponse> {
        let url_ = this.baseUrl + "/api/Authenticate/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processLogin(_response));
        });
    }

    protected processLogin(response: Response): Promise<LoginResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as LoginResponse;
            return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
            let result401: any = null;
            result401 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthenticationResponse;
            return throwException("Unauthorized", status, _responseText, _headers, result401);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<LoginResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    registerUser(body?: RegisterModel | undefined): Promise<AuthenticationResponse> {
        let url_ = this.baseUrl + "/api/Authenticate/register-user";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processRegisterUser(_response));
        });
    }

    protected processRegisterUser(response: Response): Promise<AuthenticationResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthenticationResponse;
            return result200;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
            let result500: any = null;
            result500 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthenticationResponse;
            return throwException("Server Error", status, _responseText, _headers, result500);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<AuthenticationResponse>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    registerAdmin(body?: RegisterModel | undefined): Promise<AuthenticationResponse> {
        let url_ = this.baseUrl + "/api/Authenticate/register-admin";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processRegisterAdmin(_response));
        });
    }

    protected processRegisterAdmin(response: Response): Promise<AuthenticationResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthenticationResponse;
            return result200;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
            let result500: any = null;
            result500 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthenticationResponse;
            return throwException("Server Error", status, _responseText, _headers, result500);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<AuthenticationResponse>(null as any);
    }
}

export interface AuthenticationResponse {
    status: string;
    message: string;
}

export interface GetUsersResponse {
    users: ProfileData[];
}

export interface IsLoggedInResponse {
    user: ProfileData;
}

export interface LoginModel {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    expirationDate: Date;
    user: ProfileData;
}

export interface RegisterModel {
    username: string;
    email: string;
    password: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}