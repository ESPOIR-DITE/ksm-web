import {QueryEntity} from "@datorama/akita";
import {TransactionState, TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {TransactionService} from "../../services/entry/transaction.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IngredientState, IngredientStore} from "../../store/ingredient/ingredient.store";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";

@Injectable({
  providedIn: 'root',
})
export class IngredientQuery extends QueryEntity<IngredientState, Ingredient> {
  constructor(
    protected override store: IngredientStore,
    private service: IngredientService) {
    super(store);
  }
  createIngredient(entity: Ingredient, isUpdate:boolean): Observable<Ingredient|undefined>{
    if(isUpdate){
      return this.service.updateEntity(entity)
    }
     return  this.service.createEntity(entity);

  }
  getIngredient(id: string): Observable<Ingredient|undefined> {
    if(!this.hasEntity(id)) {
      return this.service.readEntity(id);
    }
    return this.selectEntity(id);

  }
  deleteEntity(entity: Ingredient): Observable<boolean | undefined>{
      return this.service.deleteEntity(entity);
  }
  getEntities(): Observable<Ingredient[]> {
    if(!this.hasEntity()) {
        return this.service.readEntities();
    }
    return this.selectAll()
  }
}

