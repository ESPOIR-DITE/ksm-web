import {HttpHeaders} from "@angular/common/http";
import {NbGlobalPhysicalPosition} from "@nebular/theme";
import {Observable} from "rxjs";

export const STORE_TTL = 3600000;
export const BASE_URL = 'https://arcane-crag-09873.herokuapp.com/ksm/';

export class Util {
  static headers(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      // 'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    });
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
export const STATUS = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger'
};
export const TOASTR_CONFIG = {
  destroyByClick: true,
  duration: 5000,
  hasIcon: true,
  position: NbGlobalPhysicalPosition.TOP_RIGHT,
  preventDuplicates: true,
  status: STATUS.PRIMARY
};
