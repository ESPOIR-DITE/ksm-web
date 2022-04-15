import { Component, OnInit } from '@angular/core';
import {BuyerType} from "../../../../core/models/item/buyer-type.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BuyerTypeQuery} from "../../../../core/queries/item/buyer-type.query";
import {NbToastrService} from "@nebular/theme";
import {QuantityType} from "../../../../core/models/ingredient/quantity-type.model";
import {STATUS, TOASTR_CONFIG} from "../../../../shared/util";

@Component({
  selector: 'app-buyer-type',
  templateUrl: './buyer-type.component.html',
  styleUrls: ['./buyer-type.component.scss']
})
export class BuyerTypeComponent implements OnInit {
 buyerTypes: BuyerType[]|undefined;
 buyerTypeForm = new FormGroup({
   name : new FormControl('',Validators.required),
   description : new FormControl(''),
 })
  constructor(private buyerTypeQuery: BuyerTypeQuery,
              private formBuilder: FormBuilder,
              private toasterService: NbToastrService) { }

  ngOnInit(): void {
   this.buyerTypeQuery.getEntities().subscribe(result =>{
     this.buyerTypes = result;
   })
  }
  getBuyerType(): BuyerType{
    return new BuyerType('', this.buyerTypeForm.value.name,this.buyerTypeForm.value.description);
  }
  get formFields(){
    return this.buyerTypeForm.controls;
  }
  deleteBuyerType(buyerTypeId: string){
   this.buyerTypeQuery.deleteEntity(buyerTypeId).subscribe(result =>{
     console.log(result)
   })
  }
  onSubmit(){
    if(this.buyerTypeForm.invalid) return;
    let buyerType = this.getBuyerType();
    if(buyerType!=null){
      this.buyerTypeQuery.createBuyerType(buyerType,false).subscribe(result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success', 'buyer type created.')
        }else{
          this.showToast(STATUS.DANGER,'Fail', 'buyer type to be created.')
        }
      })
    }
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }

}
