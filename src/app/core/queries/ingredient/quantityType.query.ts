import {QueryEntity} from "@datorama/akita";
import {TransactionState, TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {TransactionService} from "../../services/entry/transaction.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IngredientState, IngredientStore} from "../../store/ingredient/ingredient.store";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";
import {QuantityTypeState, QuantityTypeStore} from "../../store/ingredient/quantity-type.store";
import {QuantityType} from "../../models/ingredient/quantity-type.model";
import {QuantityTypeService} from "../../services/ingredient/quantityType.service";

@Injectable({
  providedIn: 'root',
})
export class QuantityTypeQuery extends QueryEntity<QuantityTypeState, QuantityType> {
  constructor(
    protected override store: QuantityTypeStore,
    private service: QuantityTypeService) {
    super(store);
  }
  createQuantityType(entity: QuantityType, isUpdate:boolean): QuantityType | undefined{
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
  getQuantityType(id: string): Observable<QuantityType | undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id);
    return this.selectEntity(id);
  }
  deleteEntity(entity: QuantityType): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():Observable<QuantityType[]> | undefined {
    if(!this.hasEntity()) {
      return this.service.readEntities();
    }
    return this.selectAll();
  }
}

