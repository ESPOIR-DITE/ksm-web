import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {IngredientTransactionStore} from "../../store/ingredient/ingredient-transaction.store";
import {ItemStore} from "../../store/item/item.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Item} from "../../models/item/item.model";
import {BuyerType} from "../../models/item/buyer-type.model";
import {BuyerTypeStore} from "../../store/item/buyer-type.store";

@Injectable({
  providedIn: 'root',
})
export class BuyerTypeService {
  private base = BASE_URL + 'buyer-type/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: BuyerTypeStore) {
  }
  public createEntity(entity: BuyerType):Observable<BuyerType>{
    const url = this.base+'create';
    return this.http.post<BuyerType>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<BuyerType>('create error'))
      )
  }
  public updateEntity(entity: BuyerType):Observable<BuyerType>{
    const url = this.base+'update';
    return this.http.post<BuyerType>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<BuyerType>('update error'))
      )
  }
  public readEntity(id: string):Observable<BuyerType>{
    const url = this.base+'read?id='+id;
    return this.http.get<BuyerType>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<BuyerType>('read error'))
      )
  }
  public deleteEntity(id: string):Observable<boolean>{
    const url = this.base+'delete?id='+id;
    return this.http.get<boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(id)),
        catchError(ApiErrors.handleError<boolean>('delete error'))
      )
  }
  public  readEntities():Observable<BuyerType[]>{
    const url = this.base+'reads';
    return this.http.get<BuyerType[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<BuyerType[]>('reads error'))
      )
  }
}
