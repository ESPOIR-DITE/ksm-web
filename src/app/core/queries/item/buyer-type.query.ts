import {QueryEntity} from "@datorama/akita";
import {TransactionState, TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {TransactionService} from "../../services/entry/transaction.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IngredientState, IngredientStore} from "../../store/ingredient/ingredient.store";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";
import {BuyerType} from "../../models/item/buyer-type.model";
import {BuyerTypeState, BuyerTypeStore} from "../../store/item/buyer-type.store";
import {BuyerTypeService} from "../../services/item/buyer-type.service";

@Injectable({
  providedIn: 'root',
})
export class BuyerTypeQuery extends QueryEntity<BuyerTypeState, BuyerType> {
  constructor(
    protected override store: BuyerTypeStore,
    private service: BuyerTypeService) {
    super(store);
  }
  createBuyerType(entity: BuyerType, isUpdate:boolean): Observable<BuyerType | undefined>{
    if(isUpdate){
      return this.service.updateEntity(entity)
    }else
      return this.service.createEntity(entity)
  }
  getBuyerType(id: string): Observable<BuyerType|undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  deleteEntity(id: string): Observable<boolean>{
     return  this.service.deleteEntity(id)
  }
  getEntities():Observable<BuyerType[]> {
    if(!this.hasEntity()) {
      return this.service.readEntities()
    }
    return this.selectAll()
  }
}

