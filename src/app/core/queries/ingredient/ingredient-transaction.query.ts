import {Order, QueryConfig, QueryEntity} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {
  IngredientTransactionState,
  IngredientTransactionStore
} from "../../store/ingredient/ingredient-transaction.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
import {IngredientTransactionService} from "../../services/ingredient/ingredient-transaction.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
@QueryConfig({
    sortBy: 'date',
    sortByOrder: Order.ASC
  })
export class IngredientTransactionQuery extends QueryEntity<IngredientTransactionState, IngredientTransaction> {
  constructor(
    protected override store: IngredientTransactionStore,
    private service: IngredientTransactionService) {
    super(store);
  }
  createIngredientTransaction(entity: IngredientTransaction, isUpdate:boolean): Observable<IngredientTransaction | undefined>{
    if(isUpdate){
     return  this.service.updateEntity(entity)
    }else {
      return this.service.createEntity(entity)
    }
  }
  getIngredientTransaction(id: string): Observable<IngredientTransaction | undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  findAllByTransactionId(transactionId: string): Observable<IngredientTransaction[]>{
    if(!this.hasEntity())
      return this.service.findAllByTransactionId(transactionId);
    return this.selectAll({
      filterBy: [ingredientTransaction => ingredientTransaction.transactionId === transactionId]
    })
  }

  deleteEntity(entity: IngredientTransaction): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities(): Observable<IngredientTransaction[]> {
    if(!this.hasEntity()) {
      return this.service.readEntities()
    }
    return this.selectAll()
  }
  findAllByIngredientId(ingredientId: string):IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByIngredientId(ingredientId).subscribe( result => {
        return result.body;
      });
    }
    this.selectAll(
      {
        filterBy: [ entity => entity.ingredientId === ingredientId]
      }
    ).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  findAllByEntryId(entryId: string):IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByEntryId(entryId).subscribe( result => {
        return result.body;
      });
    }
    this.selectAll(
      {
        filterBy: [ entity => entity.entryId === entryId]
      }
    ).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  findAllByDate(date: Date):IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByDate(date).subscribe( result => {
        return result.body;
      });
    }
    this.selectAll(
      {
        filterBy: [ entity => entity.date === date]
      }
    ).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  findAllByOrderByDate():IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByOrderByDate().subscribe( result => {
        return result.body;
      });
    }
    this.selectAll().subscribe(result =>{
      return result;
    });
    return undefined;
  }
  deleteByTransactionAndIngredient(transactionId: string,ingredientId: string,fakeId: string):Observable<Boolean>{
    return this.service.deleteByTransactionIdAndIngredientId(transactionId, ingredientId, fakeId)
  }
}

