import {HttpHeaders} from "@angular/common/http";
import {NbGlobalPhysicalPosition} from "@nebular/theme";
import {Observable} from "rxjs";
import {UserTokenService} from "../core/services/user/user-token-service";
import {TokenService} from "../core/services/user/TokenService";

export const STORE_TTL = 3600000;
export const BASE_URL = 'https://arcane-crag-09873.herokuapp.com/ksm/';
//export const BASE_URL = 'http://localhost:8080/ksm/';

export const ROLE = {
  USER: 'user',
  ADMIN: 'admin',
  TECHADMIN: 'tech-admin'
}

export class Util {
  static headers(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Authorization', `Bearer ${TokenService.getTokenFromSession()}`);
  headers = headers.append('x-Flatten', 'true');
  headers = headers.append('Access-Control-Allow-Origin', '*');
  headers = headers.append('Content-Type', 'application/json');
  return headers;
  }
  // static headers(): HttpHeaders {
  //   let headers = new HttpHeaders({
  //     'Authorization': `Bearer ${TokenService.getTokenFromSession()}`,
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': 'http://localhost:1338/',
  //     'Access-Control-Allow-Headers': 'authorization, Content-Type, Accept, x-auth-token',
  //    'Access-Control-Allow-Methods': '*',
  //     'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  //   });
  //   return headers;
  // }
}
export class ChartPieData {
  value: number | undefined;
  name: string | undefined;

  constructor(value: number | undefined, name: string | undefined) {
    this.value = value;
    this.name = name;
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
