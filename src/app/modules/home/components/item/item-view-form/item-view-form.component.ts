import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../../core/models/item/item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientQuery} from "../../../../../core/queries/ingredient/ingredient.query";
import {NbToastrService} from "@nebular/theme";
import {ItemQuery} from "../../../../../core/queries/item/item.query";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";
import {Ingredient} from "../../../../../core/models/ingredient/ingredient.model";
import {ItemIngredient} from "../../../../../core/models/item/item-ingredient.model";
import {ItemIngredientQuery} from "../../../../../core/queries/item/item-ingredient.query";

@Component({
  selector: 'app-item-view-form',
  templateUrl: './item-view-form.component.html',
  styleUrls: ['./item-view-form.component.scss']
})
export class ItemViewFormComponent implements OnInit {
  item: Item | undefined;
  ingredients: Ingredient[]|undefined;
  itemIngredients: ItemIngredient[]|undefined;
  itemIngredientData: Array<ItemIngredient> | undefined = [];
  loading = true;
  itemLoading = true;
  costPrice = 0;
  //First form.
  itemForm = new FormGroup({
    id: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    costPrice: new FormControl(''),
    description: new FormControl(''),
  })
  //Second form.
  itemIngredientForm = new FormGroup({
    ingredient: new FormControl('',Validators.required),
    quantity: new FormControl(''),
    description: new FormControl(''),
  })
  constructor(
    private route: ActivatedRoute,
    private ingredientQuery: IngredientQuery,
    private itemQuery: ItemQuery,
    private toasterService: NbToastrService,
    private router: Router,
    private itemIngredientQuery: ItemIngredientQuery
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const  id = params['id'];
      if(id){
        this.itemQuery.getBuyerType(id).subscribe( result =>{
          this.item = result;
          this.itemForm.patchValue({
            id: result?.id,
            name : result?.name,
            description: result?.description,
            costPrice: result?.costPrice
          })
          this.itemLoading = false;
        })
        this.itemIngredientQuery.findAllByEntryId(id).subscribe(result =>{
          this.itemIngredients = result;
          for (const resultElement of result) {
            this.ingredientQuery.getIngredient(resultElement.ingredientId).subscribe(ingredient =>{
              let ingredientName:string = ingredient?.name+"";
              const ingredientPrice = ingredient?.price!;
              let price = resultElement.quantity * ingredientPrice;
              this.costPrice += price;
              this.itemIngredientData?.push( new ItemIngredient(resultElement.ingredientId+' '+resultElement.entryId,price+'',ingredientName,resultElement.quantity,ingredient!.brand))
              console.log(this.itemIngredientData)
              this.loading = false;
            })
          }
        })
      }
    });
    this.ingredientQuery.getEntities().subscribe(result => {
      if( result)
      this.ingredients = result;
    })
  }
  onRemoveItemIngredient(fakeId: string){
    const IdValues = fakeId.split(" ");
    const ingredientId = IdValues[0];
    const entryId = IdValues[1];
    console.log(ingredientId);
    console.log(entryId);
    //this.itemIngredientQuery. TODO deleteBy IngredientId and ItemId.
  }
  readIngredient(ingredientId: string){
    this.router.navigate(['/ingredient/view/'+ingredientId]);
  }
  get itemFormFields(){
    return this.itemForm?.controls;
  }
  get formFields(){
    return this.itemIngredientForm?.controls;
  }
  onBack(){
    this.router.navigate(['/item'])
  }
  getItem(): Item{
    return new Item(this.itemForm.value.id,this.itemForm.value.name,this.itemForm.value.costPrice,this.itemForm.value.description)
  }
  getItemIngredient():ItemIngredient{
    return new ItemIngredient('',this.itemForm.value.id,this.itemIngredientForm.value.ingredient,this.itemIngredientForm.value.quantity,this.itemIngredientForm.value.description)
  }
  onUpdate(){
    if(this.itemForm?.invalid) return;
    let item = this.getItem();
    if(item!=null){
      this.itemQuery.createItem(item,true).subscribe(result => {
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Item updated')
        }else{
          this.showToast(STATUS.DANGER,'Fail','Item Failed to be updated')
        }
      });
    }
  }
  onAdd(){
    if(this.itemIngredientForm?.invalid) return;
    let itemIngredient = this.getItemIngredient();
    if(itemIngredient!=null){
      this.itemIngredientQuery.createItemIngredient(itemIngredient,true).subscribe(result => {
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Item updated')
          this.itemIngredientForm.reset();
        }else{
          this.showToast(STATUS.DANGER,'Fail','Item Failed to be updated')
        }
      });
    }
  }
  onDelete(){
    if(this.itemForm?.invalid) return;
    let item = this.item;
    if(item!=null){
      this.itemQuery.deleteEntity(item).subscribe( result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Item Delete')
          this.router.navigate(['/item'])
        }else{
          this.showToast(STATUS.DANGER,'Fail','Item Failed to be Delete')
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
