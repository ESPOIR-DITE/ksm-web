import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {IngredientTransactionStore} from "../../store/ingredient/ingredient-transaction.store";
import {ItemStore} from "../../store/item/item.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Item} from "../../models/item/item.model";
import {ItemIngredientStore} from "../../store/item/item-ingredient.store";
import {ItemIngredient} from "../../models/item/item-ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class ItemIngredientService {
  private base = BASE_URL + 'item-ingredient/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: ItemIngredientStore) {
  }
  public createEntity(entity: ItemIngredient):Observable<ResponseEntity<ItemIngredient>>{
    const url = this.base+'create';
    return this.http.post<ResponseEntity<ItemIngredient>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient>>('create error'))
      )
  }
  public updateEntity(entity: ItemIngredient):Observable<ResponseEntity<ItemIngredient>>{
    const url = this.base+'update';
    return this.http.post<ResponseEntity<ItemIngredient>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.fakeId,entity)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient>>('update error'))
      )
  }
  public readEntity(id: string):Observable<ResponseEntity<ItemIngredient>>{
    const url = this.base+'read?id='+id;
    return this.http.get<ResponseEntity<ItemIngredient>>(url,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient>>('read error'))
      )
  }
  public deleteEntity(entity: ItemIngredient):Observable<ResponseEntity<ItemIngredient>>{
    const url = this.base+'delete?id='+entity.fakeId;
    return this.http.get<ResponseEntity<ItemIngredient>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.fakeId)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient>>('delete error'))
      )
  }
  public  readEntities():Observable<ResponseEntity<ItemIngredient[]>>{
    const url = this.base+'reads';
    return this.http.get<ResponseEntity<ItemIngredient[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient[]>>('reads error'))
      )
  }
  public  findAllByEntryId(entryId: string):Observable<ResponseEntity<ItemIngredient[]>>{
    const url = this.base+'find-all-by-entry-id?entryId='+entryId;
    return this.http.get<ResponseEntity<ItemIngredient[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient[]>>('reads error'))
      )
  }
  public  findAllByIngredientId(ingredientId: string):Observable<ResponseEntity<ItemIngredient[]>>{
    const url = this.base+'find-all-by-ingredient-id?entryId='+ingredientId;
    return this.http.get<ResponseEntity<ItemIngredient[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient[]>>('reads error'))
      )
  }
  public  findAllByOrderByQuantity():Observable<ResponseEntity<ItemIngredient[]>>{
    const url = this.base+'find-all-by-order-by-quantity';
    return this.http.get<ResponseEntity<ItemIngredient[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<ItemIngredient[]>>('reads error'))
      )
  }

}
