import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {StockHistory} from "../../models/stock/stock-history-model";
import {Users} from "../../models/user/users-model";
import {Organisation} from "../../models/organisation-model";
export interface OrganisationState extends EntityState<Organisation, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'organisation', idKey: 'id', cache:{
    ttl:STORE_TTL,
  }
})
export class OrganisationStore extends EntityStore<OrganisationState, Organisation>{
  constructor() {
    super();
  }
}
