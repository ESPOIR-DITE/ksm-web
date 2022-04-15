import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {TransactionTypeStore} from "../../store/entry/transaction-type.store";
import {IngredientStore} from "../../store/ingredient/ingredient.store";
import {TransactionType} from "../../models/entry/transaction-type.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientTransactionStore} from "../../store/ingredient/ingredient-transaction.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";

@Injectable({
  providedIn: 'root',
})
export class IngredientTransactionService {
  private base = BASE_URL + 'ingredient-transaction/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: IngredientTransactionStore) {
  }
  public createEntity(entity: IngredientTransaction):Observable<IngredientTransaction>{
    const url = this.base+'create';
    return this.http.post<IngredientTransaction>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<IngredientTransaction>('create error'))
      )
  }
  public updateEntity(entity: IngredientTransaction):Observable<IngredientTransaction>{
    const url = this.base+'update';
    return this.http.post<IngredientTransaction>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<IngredientTransaction>('update error'))
      )
  }
  public readEntity(id: string):Observable<IngredientTransaction>{
    const url = this.base+'read?id='+id;
    return this.http.get<IngredientTransaction>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<IngredientTransaction>('read error'))
      )
  }
  public deleteEntity(entity: IngredientTransaction):Observable<ResponseEntity<IngredientTransaction>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<IngredientTransaction>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<IngredientTransaction>>('delete error'))
      )
  }
  public  findAllByIngredientId(ingredientId: string):Observable<ResponseEntity<IngredientTransaction[]>>{
    const url = this.base+'reads-by-ingredient-id?id='+ingredientId;
    return this.http.get<ResponseEntity<IngredientTransaction[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<IngredientTransaction[]>>('reads error'))
      )
  }
  public findAllByEntryId(entryId: string):Observable<ResponseEntity<IngredientTransaction[]>>{
    const url = this.base+'reads-by-entry-id?id='+entryId;
    return this.http.get<ResponseEntity<IngredientTransaction[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<IngredientTransaction[]>>('reads error'))
      )
  }
  public readEntities():Observable<IngredientTransaction[]>{
    const url = this.base+'reads';
    return this.http.get<IngredientTransaction[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<IngredientTransaction[]>('reads error'))
      )
  }
public findAllByDate(date: Date):Observable<ResponseEntity<IngredientTransaction[]>>{
    const url = this.base+'reads-by-date?date='+date;
    return this.http.get<ResponseEntity<IngredientTransaction[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<IngredientTransaction[]>>('reads error'))
      )
  }
public  findAllByOrderByDate():Observable<ResponseEntity<IngredientTransaction[]>>{
    const url = this.base+'reads-by-order-by-date';
    return this.http.get<ResponseEntity<IngredientTransaction[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<IngredientTransaction[]>>('reads error'))
      )
  }
  public findAllByTransactionId(transactionId: string):Observable<IngredientTransaction[]>{
    const url = this.base+'find-all-by-transaction-is?transactionId='+transactionId;
    return this.http.get<IngredientTransaction[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<IngredientTransaction[]>('reads error'))
      )
  }
public deleteByTransactionIdAndIngredientId(transactionId: string,ingredientId: string,fakeId: string):Observable<boolean>{
    const url = this.base+'delete-by-transactionId-ingredientId?transactionId='+transactionId+'&'+ingredientId;
     return this.http.get<boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(fakeId)),
        catchError(ApiErrors.handleError<boolean>('reads error'))
      )
  }

}
