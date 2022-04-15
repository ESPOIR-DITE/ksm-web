import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {TransactionStore} from "../../store/entry/transaction.store";
import {Injectable} from "@angular/core";
import {TransactionType} from "../../models/entry/transaction-type.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {TransactionTypeStore} from "../../store/entry/transaction-type.store";

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeService {
  private base = BASE_URL +'transaction-type/';
  private options = {headers: Util.headers()}
  constructor(private http: HttpClient,
              private store: TransactionTypeStore) {
  }
  public createEntity(entity: TransactionType):Observable<TransactionType>{
    const url = this.base+'create';
    return this.http.post<TransactionType>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<TransactionType>('create error'))
      )
  }
  public updateEntity(entity: TransactionType):Observable<TransactionType>{
    const url = this.base+'update';
    return this.http.post<TransactionType>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<TransactionType>('update error'))
      )
  }
  public readEntity(id: string):Observable<TransactionType>{
    const url = this.base+'read?id='+id;
    return this.http.get<TransactionType>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<TransactionType>('read error'))
      )
  }
  public deleteEntity(entity: TransactionType):Observable<ResponseEntity<TransactionType>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<TransactionType>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<TransactionType>>('delete error'))
      )
  }
  public readEntities():Observable<TransactionType[]>{
    const url = this.base+'reads';
    return this.http.get<TransactionType[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<TransactionType[]>('reads error'))
      )
  }

}
