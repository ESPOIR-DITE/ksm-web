import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../../core/models/item/item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientQuery} from "../../../../../core/queries/ingredient/ingredient.query";
import {NbToastrService} from "@nebular/theme";
import {ItemQuery} from "../../../../../core/queries/item/item.query";
import {ChartPieData, STATUS, TOASTR_CONFIG} from "../../../../../shared/util";
import {Ingredient} from "../../../../../core/models/ingredient/ingredient.model";
import {ItemIngredient} from "../../../../../core/models/item/item-ingredient.model";
import {ItemIngredientQuery} from "../../../../../core/queries/item/item-ingredient.query";
import {BuyerTypeQuery} from "../../../../../core/queries/item/buyer-type.query";
import {BuyerType} from "../../../../../core/models/item/buyer-type.model";
import {SellPriceQuery} from "../../../../../core/queries/sell/sell-price.query";
import {SellPrice} from "../../../../../core/models/sell/sell-price.model";

@Component({
  selector: 'app-item-view-form',
  templateUrl: './item-view-form.component.html',
  styleUrls: ['./item-view-form.component.scss']
})
export class ItemViewFormComponent implements OnInit {
  data: ChartPieData[]=[];
  item: Item | undefined;
  ingredients: Ingredient[]|undefined;
  itemIngredients: ItemIngredient[]|undefined;
  itemIngredientData: Array<ItemIngredient> | undefined = [];
  loading = true;
  itemLoading = true;
  buyerTypeLoading = true;
  costPrice = 0;
  buyerTypes: BuyerType[]|undefined;
  sellPrices: SellPrice[]=[];
  itemAverage = 0;
  itemPriceNumber= 0;
  averagePrice = 0;
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
  //third form.
  itemSellPriceForm = new FormGroup({
    item: new FormControl(''),
    buyerTypeId: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required),
    isActive: new FormControl(''),
  })
  constructor(
    private route: ActivatedRoute,
    private ingredientQuery: IngredientQuery,
    private itemQuery: ItemQuery,
    private toasterService: NbToastrService,
    private router: Router,
    private itemIngredientQuery: ItemIngredientQuery,
    private buyerTypeQuery: BuyerTypeQuery,
    private sellPriceQuery: SellPriceQuery,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const  id = params['id'];
      if(id){
        this.itemQuery.getItem(id).subscribe( result =>{
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
          console.log(result)
          if(result.length ===0) this.loading = false;
          for (const resultElement of result) {
            this.ingredientQuery.getIngredient(resultElement.ingredientId).subscribe(ingredient =>{
              let ingredientName:string = ingredient?.name+"";
              const ingredientPrice = ingredient?.price!;
              let price = resultElement.quantity * ingredientPrice;
              this.costPrice += price;
              this.itemIngredientData?.push( new ItemIngredient(resultElement.ingredientId+' '+resultElement.entryId,price+'',ingredientName,resultElement.quantity,ingredient!.brand))
              this.makeChartPieData(resultElement.quantity,ingredient!.name)
              // console.log(this.itemIngredientData)
              this.checkInterest(this.item!.costPrice-this.costPrice);
              this.loading = false;
            })
          }
        })
      }
      this.buyerTypeQuery.getEntities().subscribe(result =>{
        this.buyerTypes = result;
      })
      this.sellPriceQuery.findAllByItemId(id).subscribe(result =>{
        if(result){
          for (const sellPrice1 of result) {
            if(sellPrice1.buyerTypeId){
              this.buyerTypeQuery.getBuyerType(sellPrice1.buyerTypeId).subscribe(buyerType => {
                if(buyerType)
                  this.sellPrices.push(new SellPrice(sellPrice1.id,sellPrice1.itemId,buyerType.name,sellPrice1.price,sellPrice1.date,sellPrice1.isActive))
                console.log('sell price: '+ sellPrice1.price )
                this.itemAverage = this.itemAverage+ sellPrice1.price;
                this.itemPriceNumber++;
                console.log('sell price total: '+ this.itemAverage )
                //this.itemAverage = this.itemAverage+this.item!.costPrice;
                //Getting Average Price
              })
            }
          }
          this.getPricesAverage(this.item!.costPrice)
        }
        this.buyerTypeLoading = false;
      })
    });
    this.ingredientQuery.getEntities().subscribe(result => {
      if( result)
      this.ingredients = result;
    })
  }
  getPricesAverage(itemCostPrice: number){
    this.itemAverage = this.itemAverage + itemCostPrice
    this.itemPriceNumber=this.itemPriceNumber + 1
    this.averagePrice = this.itemAverage/this.itemPriceNumber;
    console.log(this.averagePrice)
  }
  checkInterest(interest: number){
    if(interest<0)
      document.getElementById("sellPrice")!.style.backgroundColor = 'darkorange';
  }
  viewIngredient(fakeId: string){
    const IdValues = fakeId.split(" ");
    const ingredientId = IdValues[0];
    this.router.navigate(['ingredient/view/'+ingredientId])
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
      this.itemIngredientQuery.createItemIngredient(itemIngredient,false).subscribe(result => {
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Item updated')
          this.itemIngredientForm.reset();
        }else{
          this.showToast(STATUS.DANGER,'Fail','Item Failed to be updated')
        }
      });
    }
  }
  makeChartPieData(values: number,name: string){
    let dataObj = new  ChartPieData(values,name)
    this.data?.push(dataObj);
  }
  getSellPrice():SellPrice{
    return new SellPrice('',this.item!.id,this.itemSellPriceForm.value.buyerTypeId,this.itemSellPriceForm.value.price,this.itemSellPriceForm.value.date,this.itemSellPriceForm.value.isActive)
  }
  onSubmitSellPrice(){
    if(this.itemSellPriceForm.invalid) return;
    let sellPrice = this.getSellPrice()
    console.log(sellPrice);
    if(sellPrice!=null){
      this.sellPriceQuery.createSellPrice(sellPrice,false).subscribe(result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','sell price created')
        }else{
          this.showToast(STATUS.DANGER,'Fail','Sell price Failed to be created')
        }
      })
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
