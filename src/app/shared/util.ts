import {HttpHeaders} from "@angular/common/http";

export const STORE_TTL = 3600000;
export const BASE_URL = 'localhost:9000/ksm/';

export class Util {
  static headers(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'APIKEY');
    headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }
}
export interface ResponseEntity<T> {
  headers: { [headerName: string]: string },
  body: T,
  // statusCode: string;
  // statusCodeValue: string;
  statusCode: "OK" | "SERVER_ERROR" | "BAD_REQUEST", //etc
  statusCodeValue: "200" | "500" | "400" | "404" //etc
}
