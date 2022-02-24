import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Transaction} from "../../models/entry/transaction.model";
import {Injectable} from "@angular/core";
import {STORE_TTL} from "../../../shared/util";

export interface TransactionState extends EntityState<Transaction, string> {

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class TransactionStore extends EntityStore<TransactionState, Transaction>{
  constructor() {
    super();
  }

}
