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
  public createEntity(entity: BuyerType):Observable<ResponseEntity<BuyerType>>{
    const url = this.base+'create';
    return this.http.post<ResponseEntity<BuyerType>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<BuyerType>>('create error'))
      )
  }
  public updateEntity(entity: BuyerType):Observable<ResponseEntity<BuyerType>>{
    const url = this.base+'update';
    return this.http.post<ResponseEntity<BuyerType>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<ResponseEntity<BuyerType>>('update error'))
      )
  }
  public readEntity(id: string):Observable<ResponseEntity<BuyerType>>{
    const url = this.base+'read?id='+id;
    return this.http.get<ResponseEntity<BuyerType>>(url,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<BuyerType>>('read error'))
      )
  }
  public deleteEntity(entity: BuyerType):Observable<ResponseEntity<BuyerType>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<BuyerType>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<BuyerType>>('delete error'))
      )
  }
  public  readEntities():Observable<ResponseEntity<BuyerType[]>>{
    const url = this.base+'reads';
    return this.http.get<ResponseEntity<BuyerType[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<BuyerType[]>>('reads error'))
      )
  }
}
