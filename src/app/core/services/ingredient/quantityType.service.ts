import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {TransactionTypeStore} from "../../store/entry/transaction-type.store";
import {IngredientStore} from "../../store/ingredient/ingredient.store";
import {TransactionType} from "../../models/entry/transaction-type.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {QuantityTypeStore} from "../../store/ingredient/quantity-type.store";
import {QuantityType} from "../../models/ingredient/quantity-type.model";

@Injectable({
  providedIn: 'root',
})
export class QuantityTypeService {
  private base = BASE_URL + 'quantity-type/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: QuantityTypeStore) {
  }
  public createEntity(entity: QuantityType):Observable<ResponseEntity<QuantityType>>{
    const url = this.base+'create';
    return this.http.post<ResponseEntity<QuantityType>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<QuantityType>>('create error'))
      )
  }
  public updateEntity(entity: QuantityType):Observable<ResponseEntity<QuantityType>>{
    const url = this.base+'update';
    return this.http.post<ResponseEntity<QuantityType>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<ResponseEntity<QuantityType>>('update error'))
      )
  }
  public readEntity(id: string):Observable<QuantityType>{
    const url = this.base+'read?id='+id;
    return this.http.get<QuantityType>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<QuantityType>('read error'))
      )
  }
  public deleteEntity(entity: QuantityType):Observable<ResponseEntity<QuantityType>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<QuantityType>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<QuantityType>>('delete error'))
      )
  }
  public readEntities():Observable<QuantityType[]>{
    const url = this.base+'reads';
    return this.http.get<QuantityType[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<QuantityType[]>('reads error'))
      )
  }
}
