import {QueryEntity} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {Observable} from "rxjs";
import {OrganisationState, OrganisationStore} from "../../store/organisation/organisation-store";
import {Organisation} from "../../models/organisation-model";
import {OrganisationService} from "../../services/organisation/organisation.service";

@Injectable({
  providedIn: 'root',
})
export class OrganisationQuery extends QueryEntity<OrganisationState, Organisation> {
  constructor(
    protected override store: OrganisationStore,
    private service: OrganisationService) {
    super(store);
  }
  createOrganisation(entity: Organisation, isUpdate:boolean): Observable<Organisation>{
    if(isUpdate)
      return this.service.updateEntity(entity)
    else
      return this.service.createEntity(entity)
  }
  getOrganisation(id: string): Observable<Organisation | undefined>{
    if(!this.hasEntity(id)) {
      return this.service.readEntity(id)
    }
    return this.selectEntity(id)
  }
  deleteEntity(entity: Organisation): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():Observable<Organisation[]> {
    if(!this.hasEntity()) {
      return this.service.readEntities()
    }
    return this.selectAll()
  }
  readAllByParentId(organisationId: string):Observable<Organisation[]> {
    if(!this.hasEntity()) {
      return this.service.readAllByParentId(organisationId)
    }
    return this.selectAll({
      filterBy: [ entity => entity.organisationId === organisationId]
    })
  }

}

