import {combineQueries, QueryEntity} from "@datorama/akita";
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
import {Item} from "../../models/item/item.model";
import {ItemState, ItemStore} from "../../store/item/item.store";
import {ItemService} from "../../services/item/item.service";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {SellPrice} from "../../models/sell/sell-price.model";
import {SellPriceState, SellPriceStore} from "../../store/sell/sell-price.store";
import {SellPriceService} from "../../services/sell/sellPrice.service";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";

@Injectable({
  providedIn: 'root',
})
export class SellPriceQuery extends QueryEntity<SellPriceState, SellPrice> {
  constructor(
    protected override store: SellPriceStore,
    private service: SellPriceService) {
    super(store);
  }
  createBuyerType(entity: SellPrice, isUpdate:boolean): SellPrice | undefined{
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
  getBuyerType(id: string): SellPrice | undefined{
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
  deleteEntity(entity: SellPrice): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():SellPrice[] | undefined {
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
  findAllByBuyerTYpeIdAndDateOrderByPrice(buyerTypeId: string, date: Date):IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByBuyerTYpeIdAndDateOrderByPrice(buyerTypeId, date).subscribe( result => {
        return result.body;
      });
    }
    const filter1 = this.selectAll({
        filterBy: [ entity => entity.date === date],
      })
    const filter2 = this.selectAll({
      filterBy: [entity => entity.buyerTypeId === buyerTypeId],
      })

      combineQueries([filter1,filter2]).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  findAllByBuyerTYpeIdAndIsActive(buyerTypeId: string, isActive: boolean):IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByBuyerTYpeIdAndIsActive(buyerTypeId, isActive).subscribe( result => {
        return result.body;
      });
    }
    const filter1 = this.selectAll({
      filterBy: [ entity => entity.buyerTypeId === buyerTypeId],
    })
    const filter2 = this.selectAll({
      filterBy: [entity => entity.isActive === isActive],
    })

    combineQueries([filter1,filter2]).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  findAllByItemIdAndIsActive(itemId: string,isActive: boolean):IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByItemIdAndIsActive(itemId, isActive).subscribe( result => {
        return result.body;
      });
    }
    const filter1 = this.selectAll({
      filterBy: [ entity => entity.itemId === itemId],
    })
    const filter2 = this.selectAll({
      filterBy: [entity => entity.isActive === isActive],
    })

    combineQueries([filter1,filter2]).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  findAllByItemIdAndBuyerTYpeId(itemId: string, buyerTypeId: string):IngredientTransaction[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByItemIdAndBuyerTYpeId(itemId, buyerTypeId).subscribe( result => {
        return result.body;
      });
    }
    const filter1 = this.selectAll({
      filterBy: [ entity => entity.itemId === itemId],
    })
    const filter2 = this.selectAll({
      filterBy: [entity => entity.buyerTypeId === buyerTypeId],
    })

    combineQueries([filter1,filter2]).subscribe(result =>{
      return result;
    });
    return undefined;
  }
}

