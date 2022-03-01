import {Order, QueryConfig, QueryEntity} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {
  IngredientTransactionState,
  IngredientTransactionStore
} from "../../store/ingredient/ingredient-transaction.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
import {IngredientTransactionService} from "../../services/ingredient/ingredient-transaction.service";

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
  createIngredientTransaction(entity: IngredientTransaction, isUpdate:boolean): IngredientTransaction | undefined{
    if(isUpdate){
      this.service.updateEntity(entity).subscribe(result =>{
        return result.body;
      })
    }else {
      this.service.createEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return undefined;
  }
  getIngredientTransaction(id: string): IngredientTransaction | undefined{
    if(!this.hasEntity(id)) {
      this.service.readEntity(id).subscribe( result => {
        return result.body;
      });
    }
    this.selectEntity(id).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  deleteEntity(entity: IngredientTransaction): boolean | undefined{
    if(!this.hasEntity(entity.fakeId)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.readEntities().subscribe( result => {
        return result.body;
      });
    }
    this.selectAll().subscribe(result =>{
      return result;
    });
    return undefined;
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
}

