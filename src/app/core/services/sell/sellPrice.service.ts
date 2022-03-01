import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {IngredientTransactionStore} from "../../store/ingredient/ingredient-transaction.store";
import {ItemStore} from "../../store/item/item.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Item} from "../../models/item/item.model";
import {SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellPrice} from "../../models/sell/sell-price.model";
import {SellPriceStore} from "../../store/sell/sell-price.store";

@Injectable({
  providedIn: 'root',
})
export class SellPriceService {
  private base = BASE_URL + 'sell-price/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: SellPriceStore) {
  }
  public createEntity(entity: SellPrice):Observable<ResponseEntity<SellPrice>>{
    const url = this.base+'create';
    return this.http.post<ResponseEntity<SellPrice>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice>>('create error'))
      )
  }
  public updateEntity(entity: SellPrice):Observable<ResponseEntity<SellPrice>>{
    const url = this.base+'update';
    return this.http.post<ResponseEntity<SellPrice>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice>>('update error'))
      )
  }
  public readEntity(id: string):Observable<ResponseEntity<SellPrice>>{
    const url = this.base+'read?id='+id;
    return this.http.get<ResponseEntity<SellPrice>>(url,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice>>('read error'))
      )
  }
  public deleteEntity(entity: SellPrice):Observable<ResponseEntity<SellPrice>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<SellPrice>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice>>('delete error'))
      )
  }
  public  readEntities():Observable<ResponseEntity<SellPrice[]>>{
    const url = this.base+'reads';
    return this.http.get<ResponseEntity<SellPrice[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice[]>>('reads error'))
      )
  }
  public  findAllByBuyerTYpeIdAndDateOrderByPrice(buyerTypeId: string, date: Date):Observable<ResponseEntity<SellPrice[]>>{
    const url = this.base+'find-all-by-buyer-type-id-and-date?buyerTypeId='+buyerTypeId+'&date='+date;
    return this.http.get<ResponseEntity<SellPrice[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice[]>>('reads error'))
      )
  }
  public  findAllByBuyerTYpeIdAndIsActive(buyerId: string, isActive: boolean):Observable<ResponseEntity<SellPrice[]>>{
    const url = this.base+'find-all-by-buyer-type-id-and-is-active?buyerId='+buyerId+'&isActive='+isActive;
    return this.http.get<ResponseEntity<SellPrice[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice[]>>('reads error'))
      )
  }
  public  findAllByItemIdAndIsActive(itemId: string,isActive: boolean):Observable<ResponseEntity<SellPrice[]>>{
    const url = this.base+'find-all-by-item-and-is-active?buyerId='+itemId+'&isActive='+isActive;
    return this.http.get<ResponseEntity<SellPrice[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice[]>>('reads error'))
      )
  }
  public  findAllByItemIdAndBuyerTYpeId(itemId: string, buyerId: string):Observable<ResponseEntity<SellPrice[]>>{
    const url = this.base+'find-all-by-item-id-and-buyer-type-id?itemId='+itemId+'&buyerId='+buyerId;
    return this.http.get<ResponseEntity<SellPrice[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<SellPrice[]>>('reads error'))
      )
  }
}
