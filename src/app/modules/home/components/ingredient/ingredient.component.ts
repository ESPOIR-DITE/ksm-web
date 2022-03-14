import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../../../../core/models/ingredient/ingredient.model";
import {IngredientQuery} from "../../../../core/queries/ingredient/ingredient.query";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NbToastrService} from "@nebular/theme";
import {QuantityTypeQuery} from "../../../../core/queries/ingredient/quantityType.query";
import {QuantityType} from "../../../../core/models/ingredient/quantity-type.model";
import {STATUS, TOASTR_CONFIG} from "../../../../shared/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
ingredients: Ingredient[] | undefined;
quantityType!: QuantityType[];
loading = true;

  constructor(private ingredientQuery: IngredientQuery,
              private route: Router,
              private quantityTypeQuery: QuantityTypeQuery) { }

  ngOnInit(): void {
   this.ingredientQuery.getEntities().subscribe(result =>{
     console.log(result)
     this.ingredients = result;
     this.loading = false;
   });
    this.getQuantityType();
  }
  getQuantityType(){
     this.quantityTypeQuery.getEntities()?.subscribe(result =>{
       this.quantityType = result;
     });
  }

  readIngredient(id: string){
    this.route.navigate(['/ingredient/view/'+id])
  }
  onCreate(){
    this.route.navigate(['/ingredient/create'])
  }

}
