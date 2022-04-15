import {QueryEntity} from "@datorama/akita";
import {TransactionState, TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {TransactionService} from "../../services/entry/transaction.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TransactionQuery extends QueryEntity<TransactionState, Transaction> {
  constructor(
    protected override store: TransactionStore,
    private service: TransactionService) {
    super(store);
  }
  createTransaction(entity: Transaction, isUpdate:boolean): Observable<Transaction | undefined>{
    if(isUpdate){
      return this.service.updateEntity(entity)
    }else
      return this.service.createEntity(entity)
  }
  getTransaction(id: string): Observable<Transaction | undefined>{
    if(!this.hasEntity(id))
      return  this.service.readEntity(id);
    return this.selectEntity(id);
  }
  deleteEntity(entity: Transaction): Observable<Boolean>{
      return this.service.deleteEntity(entity);

  }
  getEntities():Observable<Transaction[]>{
    if(!this.hasEntity())
      return this.service.readEntities();
    return this.selectAll();
  }
}
