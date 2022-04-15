import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private base = BASE_URL +'transaction/';
  private options = {headers: Util.headers()}
  constructor(private http: HttpClient,
              private store: TransactionStore) {
  }
  public createEntity(entity: Transaction): Observable<Transaction>{
    const url = this.base+'create';
    return this.http.post<Transaction>(url, entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Transaction>('create error')),
      );
  }
  public updateEntity(entity: Transaction): Observable<Transaction>{
    const url = this.base+'update';
    return this.http.post<Transaction>(url, entity,this.options)
      .pipe(
        tap(_ => this.store.replace(entity.id, entity)),
        catchError(ApiErrors.handleError<Transaction>('update error')),
      );
  }
  public readEntity(id: string): Observable<Transaction>{
    const url = this.base+'read?id=' +id;
    return this.http.get<Transaction>(url, this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Transaction>('readEntity error')),
      );
  }
  public readEntities(): Observable<Transaction[]>{
    const url = this.base+'reads';
    return this.http.get<Transaction[]>(url, this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Transaction[]>('readEntities error')),
      );
  }
  public deleteEntity(entity: Transaction): Observable<Boolean> {
    const url = BASE_URL + this.base + 'delete?id=' + entity.id;
    return this.http.get<Boolean>(url, this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<Boolean>('delete Error ')));
  }
  public readAllByDate(date: Date): Observable<ResponseEntity<Transaction[]>>{
    const url = this.base+'read-all-by-date?=date='+date;
    return this.http.get<ResponseEntity<Transaction[]>>(url, this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Transaction[]>>('readAllByDate error')),
      );
  }
  public readAllBySupplier(supplierId: string): Observable<ResponseEntity<Transaction[]>>{
    const url = this.base+'read-all-by-supplier?=date='+supplierId;
    return this.http.get<ResponseEntity<Transaction[]>>(url, this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Transaction[]>>('readAllBySupplier error')),
      );
  }
  public readAllByTransaction(transactionId: string): Observable<ResponseEntity<Transaction[]>>{
    const url = this.base+'read-all-by-transactionId?=date='+transactionId;
    return this.http.get<ResponseEntity<Transaction[]>>(url, this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Transaction[]>>('readAllByTransaction error')),
      );
  }
}
