import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {OrganisationStore} from "../../store/organisation/organisation-store";
import {Organisation} from "../../models/organisation-model";

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  private base = BASE_URL + 'organisation/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: OrganisationStore) {
  }
  public createEntity(entity: Organisation):Observable<Organisation>{
    const url = this.base+'create';
    return this.http.post<Organisation>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Organisation>('create error'))
      )
  }
  public updateEntity(entity: Organisation):Observable<Organisation>{
    const url = this.base+'update';
    return this.http.post<Organisation>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<Organisation>('update error'))
      )
  }
  public readEntity(id: string):Observable<Organisation>{
    const url = this.base+'read?id='+id;
    return this.http.get<Organisation>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Organisation>('read error'))
      )
  }
  public deleteEntity(entity: Organisation):Observable<ResponseEntity<Organisation>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<Organisation>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<Organisation>>('delete error'))
      )
  }
  public  readEntities():Observable<Organisation[]>{
    const url = this.base+'reads';
    return this.http.get<Organisation[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Organisation[]>('reads error'))
      )
  }
  public  readAllByParentId(organisationId: string):Observable<Organisation[]>{
    const url = this.base+'reads-by-parent?organisation='+organisationId;
    return this.http.get<Organisation[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Organisation[]>('reads error'))
      )
  }

}
