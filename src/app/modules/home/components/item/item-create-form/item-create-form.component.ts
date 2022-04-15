import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemQuery} from "../../../../../core/queries/item/item.query";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {Item} from "../../../../../core/models/item/item.model";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";

@Component({
  selector: 'app-item-create-form',
  templateUrl: './item-create-form.component.html',
  styleUrls: ['./item-create-form.component.scss']
})
export class ItemCreateFormComponent implements OnInit {
  itemForm = new FormGroup({
    name: new FormControl('',Validators.required),
    costPrice: new FormControl(''),
    description: new FormControl(''),
  })
  constructor(private itemQuery: ItemQuery,
              private toasterService: NbToastrService,
              private route: Router) { }

  ngOnInit(): void {
  }
  getItem():Item {
    return new Item('',this.itemForm.value.name,this.itemForm.value.costPrice,this.itemForm.value.description)
  }
  get formFields(){
    return this.itemForm?.controls;
  }
  onBack(){
    this.route.navigate(['/item'])
  }
  onSubmit(){
    if(this.itemForm?.invalid) return;
    let item = this.getItem();
    if(item!=null){
      this.itemQuery.createItem(item,false).subscribe( result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Item created')
          this.itemForm.reset();
          this.route.navigate(['/item/view/'+result.id])
        }else{
          this.showToast(STATUS.DANGER,'Fail','Item Failed to be created')
        }
      });
    }
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }

}
