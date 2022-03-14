import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Ingredient} from "../../../../../core/models/ingredient/ingredient.model";
import {IngredientQuery} from "../../../../../core/queries/ingredient/ingredient.query";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuantityType} from "../../../../../core/models/ingredient/quantity-type.model";
import {NbToastrService} from "@nebular/theme";
import {QuantityTypeQuery} from "../../../../../core/queries/ingredient/quantityType.query";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";

@Component({
  selector: 'app-ingredient-view-form',
  templateUrl: './ingredient-view-form.component.html',
  styleUrls: ['./ingredient-view-form.component.scss']
})
export class IngredientViewFormComponent implements OnInit {
  Ingredient: Ingredient|undefined;
  quantityType!: QuantityType[];
  quantityTypeName: string|undefined;
  ingredientForm = new FormGroup({
      id: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      brand: new FormControl(''),
      description: new FormControl(''),
      quantityTypeId: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
    }
  );
  constructor(private route: ActivatedRoute, private ingredientQuery: IngredientQuery,
              private toasterService: NbToastrService,
              private router: Router,
              private quantityTypeQuery: QuantityTypeQuery ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const  id = params['id'];
      if(id){
        this.ingredientQuery.getIngredient(id).subscribe( result =>{
          this.Ingredient = result;
          if(result!=null){
            this.quantityTypeQuery.getQuantityType(result!.quantityType)?.subscribe(result =>{
              this.quantityTypeName = result?.name;
            });
          this.ingredientForm.patchValue({
            id: result?.id,
            name : result?.name,
            brand: result?.brand,
            description: result?.description,
            quantityTypeId: result?.quantityType,
            price: result?.price
          })
          }
        })
      }
    });

    this.quantityTypeQuery.getEntities()?.subscribe(result =>{
      this.quantityType = result;
    });
  }
  get formFields(){
    return this.ingredientForm?.controls;
  }
  onBack(){
    this.router.navigate(['/ingredient'])
  }
  getIngredient():Ingredient{
    return new Ingredient(this.ingredientForm?.value.id, this.ingredientForm?.value.name,this.ingredientForm?.value.description,this.ingredientForm?.value.quantityTypeId,this.ingredientForm?.value.brand,this.ingredientForm?.value.price)
  }
  onUpdate(){
    if(this.ingredientForm?.invalid) return;
    let ingredient = this.getIngredient();
    if(ingredient!=null){
      this.ingredientQuery.createIngredient(ingredient,true).subscribe(result => {
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Ingredient updated')
        }else{
          this.showToast(STATUS.DANGER,'Fail','Ingredient Failed to be updated')
        }
      });
    }
  }
  onDelete(){
    if(this.ingredientForm?.invalid) return;
    let ingredient = this.Ingredient;
    if(ingredient!=null){
      this.ingredientQuery.deleteEntity(ingredient).subscribe( result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Ingredient Delete')
          this.router.navigate(['/ingredient'])
        }else{
          this.showToast(STATUS.DANGER,'Fail','Ingredient Failed to be Delete')
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
