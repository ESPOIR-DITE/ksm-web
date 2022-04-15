import { Component, OnInit } from '@angular/core';
import {QuantityType} from "../../../../core/models/ingredient/quantity-type.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuantityTypeQuery} from "../../../../core/queries/ingredient/quantityType.query";
import {NbToastrService} from "@nebular/theme";
import {STATUS, TOASTR_CONFIG} from "../../../../shared/util";

@Component({
  selector: 'app-quantity-type',
  templateUrl: './quantity-type.component.html',
  styleUrls: ['./quantity-type.component.scss']
})
export class QuantityTypeComponent implements OnInit {
  quantityTypes: QuantityType[] | undefined;
  quantityTypeForm = new FormGroup( {
  name: new FormControl('',Validators.required),
  description: new FormControl(''),
}
)
  constructor(private quantityTypeQuery: QuantityTypeQuery, private formBuilder: FormBuilder, private toasterService: NbToastrService) { }

  ngOnInit(): void {
      this.quantityTypeQuery.getEntities()?.subscribe(result =>{
        this.quantityTypes = result;
      });
  }
  getQuantityType(): QuantityType{
    return new QuantityType('', this.quantityTypeForm.value.name,this.quantityTypeForm.value.descrption);
  }
  get formFields(){
    return this.quantityTypeForm.controls;
  }
  onSubmit(){
    if(this.quantityTypeForm.invalid) return;
    let quantityType = this.getQuantityType();
    if(quantityType!=null){
      let result = this.quantityTypeQuery.createQuantityType(quantityType,false);
      if(!result){
        this.showToast(STATUS.SUCCESS,'Success', 'QuantityType created.')
      }else{
        this.showToast(STATUS.DANGER,'Fail', 'QuantityType created.')
      }
    }
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
}
