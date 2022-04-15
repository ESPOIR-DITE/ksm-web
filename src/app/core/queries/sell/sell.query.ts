import {QueryEntity} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SellQuery extends QueryEntity<SellState, Sell> {
  constructor(
    protected override store: SellStore,
    private service: SellService) {
    super(store);
  }
  createSell(entity: Sell, isUpdate:boolean): Observable<Sell>{
    if(isUpdate)
      return this.service.updateEntity(entity)
    else
      return this.service.createEntity(entity)
  }
  getSell(id: string): Observable<Sell | undefined>{
    if(!this.hasEntity(id)) {
      return this.service.readEntity(id)
    }
    return this.selectEntity(id)
  }
  deleteEntity(entity: Sell): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():Observable<Sell[]> {
    if(!this.hasEntity()) {
      return this.service.readEntities()
    }
    return this.selectAll()
  }
}

