import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Transaction} from "../../models/entry/transaction.model";
import {TransactionType} from "../../models/entry/transaction-type.model";
export interface TransactionTypeState extends EntityState<TransactionTypeState, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction-type', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class TransactionTypeStore extends EntityStore<TransactionTypeState,TransactionType>{
  constructor() {
    super();
  }
}
