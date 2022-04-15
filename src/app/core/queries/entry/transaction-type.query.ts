import {QueryEntity} from "@datorama/akita";
import {TransactionState, TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {TransactionService} from "../../services/entry/transaction.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TransactionTypeState, TransactionTypeStore} from "../../store/entry/transaction-type.store";
import {TransactionType} from "../../models/entry/transaction-type.model";
import {TransactionTypeService} from "../../services/entry/transaction-type.service";

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeQuery extends QueryEntity<TransactionTypeState, TransactionType> {
  constructor(
    protected override store: TransactionTypeStore,
    private service: TransactionTypeService) {
    super(store);
  }
  createTransactionType(entity: TransactionType, isUpdate:boolean): Observable<TransactionType | undefined>{
    if(isUpdate){
      return this.service.updateEntity(entity)
    }else {
      return this.service.createEntity(entity)
    }
  }
  getTransactionType(id: string): Observable<TransactionType | undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  getTransactionTypes():Observable<TransactionType[]>{
    if(!this.hasEntity())
      return this.service.readEntities();
    return this.selectAll();
  }
  deleteEntity(entity: TransactionType): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
}
