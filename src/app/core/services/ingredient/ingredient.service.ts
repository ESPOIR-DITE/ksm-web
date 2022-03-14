import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {TransactionTypeStore} from "../../store/entry/transaction-type.store";
import {IngredientStore} from "../../store/ingredient/ingredient.store";
import {TransactionType} from "../../models/entry/transaction-type.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Ingredient} from "../../models/ingredient/ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private base = BASE_URL + 'ingredient/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: IngredientStore) {
  }
  public createEntity(entity: Ingredient):Observable<Ingredient|undefined>{
    const url = this.base+'create';
    return this.http.post<Ingredient>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Ingredient>('create error'))
      )
  }
  public updateEntity(entity: Ingredient):Observable<Ingredient|undefined>{
    const url = this.base+'update';
    return this.http.post<Ingredient>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<Ingredient>('update error'))
      )
  }
  public readEntity(id: string):Observable<Ingredient>{
    const url = this.base+'read?id='+id;
    return this.http.get<Ingredient>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Ingredient>('read error'))
      )
  }
  public deleteEntity(entity: Ingredient):Observable<boolean | undefined>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<boolean>('delete error'))
      )
  }
  public readEntities():Observable<Ingredient[]>{
    const url = this.base+'reads';
    return this.http.get<Ingredient[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Ingredient[]>('reads error'))
      )
  }
}
