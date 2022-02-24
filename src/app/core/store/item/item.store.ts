import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Item} from "../../models/item/item.model";

export interface ItemState extends EntityState<Item, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class ItemStore extends EntityStore<ItemState, Item>{
  constructor() {
    super();
  }
}
