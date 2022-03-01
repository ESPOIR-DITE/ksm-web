import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {IngredientTransactionStore} from "../../store/ingredient/ingredient-transaction.store";
import {ItemStore} from "../../store/item/item.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Item} from "../../models/item/item.model";

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private base = BASE_URL + 'item/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: ItemStore) {
  }
  public createEntity(entity: Item):Observable<ResponseEntity<Item>>{
    const url = this.base+'create';
    return this.http.post<ResponseEntity<Item>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Item>>('create error'))
      )
  }
  public updateEntity(entity: Item):Observable<ResponseEntity<Item>>{
    const url = this.base+'update';
    return this.http.post<ResponseEntity<Item>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<ResponseEntity<Item>>('update error'))
      )
  }
  public readEntity(id: string):Observable<ResponseEntity<Item>>{
    const url = this.base+'read?id='+id;
    return this.http.get<ResponseEntity<Item>>(url,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Item>>('read error'))
      )
  }
  public deleteEntity(entity: Item):Observable<ResponseEntity<Item>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<Item>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<Item>>('delete error'))
      )
  }
  public  readEntities():Observable<ResponseEntity<Item[]>>{
    const url = this.base+'reads';
    return this.http.get<ResponseEntity<Item[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Item[]>>('reads error'))
      )
  }
}
