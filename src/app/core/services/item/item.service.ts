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
  public createEntity(entity: Item):Observable<Item>{
    const url = this.base+'create';
    return this.http.post<Item>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Item>('create error'))
      )
  }
  public updateEntity(entity: Item):Observable<Item>{
    const url = this.base+'update';
    return this.http.post<Item>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<Item>('update error'))
      )
  }
  public readEntity(id: string):Observable<Item | undefined>{
    const url = this.base+'read?id='+id;
    return this.http.get<Item>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Item>('read error'))
      )
  }
  public deleteEntity(entity: Item):Observable<boolean|undefined>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<boolean>('delete error'))
      )
  }
  public  readEntities():Observable<Item[]>{
    const url = this.base+'reads';
    return this.http.get<Item[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Item[]>('reads error'))
      )
  }
}
