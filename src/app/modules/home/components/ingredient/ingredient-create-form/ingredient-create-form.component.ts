import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../../../../core/models/ingredient/ingredient.model";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";
import {IngredientQuery} from "../../../../../core/queries/ingredient/ingredient.query";
import {NbToastrService} from "@nebular/theme";
import {QuantityType} from "../../../../../core/models/ingredient/quantity-type.model";
import {QuantityTypeQuery} from "../../../../../core/queries/ingredient/quantityType.query";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ingredient-create-form',
  templateUrl: './ingredient-create-form.component.html',
  styleUrls: ['./ingredient-create-form.component.scss']
})
export class IngredientCreateFormComponent implements OnInit {
  quantityType!: QuantityType[];
  ingredientForm = new FormGroup({
      name: new FormControl('',Validators.required),
      brand: new FormControl(''),
      description: new FormControl(''),
      quantityTypeId: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
    }
  );
  constructor(private ingredientQuery: IngredientQuery,
              private formBuilder: FormBuilder,
              private toasterService: NbToastrService,
              private quantityTypeQuery: QuantityTypeQuery,
              private route: Router) { }

  ngOnInit(): void {
    this.quantityTypeQuery.getEntities()?.subscribe(result =>{
      this.quantityType = result;
    });
  }
  getIngredient():Ingredient{
    return new Ingredient('', this.ingredientForm?.value.name,this.ingredientForm?.value.description,this.ingredientForm?.value.quantityTypeId,this.ingredientForm?.value.brand,this.ingredientForm?.value.price)
  }
  get formFields(){
    return this.ingredientForm?.controls;
  }
  onBack(){
    this.route.navigate(['/ingredient'])
  }
  onSubmit(){
    if(this.ingredientForm?.invalid) return;
    let ingredient = this.getIngredient();
    if(ingredient!=null){
      this.ingredientQuery.createIngredient(ingredient,false).subscribe( result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Ingredient created')
          this.ingredientForm.reset();
        }else{
          this.showToast(STATUS.DANGER,'Fail','Ingredient Failed to be created')
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
