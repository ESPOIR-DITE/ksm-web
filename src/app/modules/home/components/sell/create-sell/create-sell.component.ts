import {Component, OnInit} from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {SellPeriodQuery} from "../../../../../core/queries/sell/sell-period.query";
import {SellQuery} from "../../../../../core/queries/sell/sell.query";
import {PeriodTask} from "../../../../../core/models/sell/period-task-model";
import {PeriodTaskQuery} from "../../../../../core/queries/sell/period-task.query";
import {BuyerTypeQuery} from "../../../../../core/queries/item/buyer-type.query";
import {BuyerType} from "../../../../../core/models/item/buyer-type.model";
import {ItemQuery} from "../../../../../core/queries/item/item.query";
import {Item} from "../../../../../core/models/item/item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sell} from "../../../../../core/models/sell/sell.model";
import {SellPeriod} from "../../../../../core/models/sell/sell-period-model";
import {SellPrice} from "../../../../../core/models/sell/sell-price.model";
import {SellPriceQuery} from "../../../../../core/queries/sell/sell-price.query";
import {lastValueFrom, Observable, take} from "rxjs";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";

@Component({
  selector: 'app-create-sell',
  templateUrl: './create-sell.component.html',
  styleUrls: ['./create-sell.component.scss']
})
export class CreateSellComponent implements OnInit {
periodTask: PeriodTask|undefined;
buyerTypes: BuyerType[]|undefined;
items: Item[]|undefined;
buyerTypeInputStat = false;
  sellForm = new FormGroup({
    item: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    price: new FormControl({value:'' ,disabled: true}, Validators.required),
    buyerType: new FormControl({value:'' ,disabled: true}, Validators.required), //Todo should be required.
    date: new FormControl(''),
  })
  //first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
  constructor(private toasterService: NbToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private sellPeriodQuery: SellPeriodQuery,
              private sellQuery: SellQuery,
              private periodTaskQuery: PeriodTaskQuery,
              private buyerTypeQuery: BuyerTypeQuery,
              private itemQuery: ItemQuery,
              private sellPriceQuery: SellPriceQuery) { }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      const  periodTaskIdValue = param['periodTaskId'];
      if(periodTaskIdValue){
        this.periodTaskQuery.getPeriodTask(periodTaskIdValue).subscribe(periodTask =>{
          this.periodTask = periodTask;
        })
      }
    });
    this.buyerTypeQuery.getEntities().subscribe(buyerTypes =>{
      this.buyerTypes = buyerTypes;
    })
    this.itemQuery.getEntities().subscribe(items =>{
      this.items = items;
    })
  }

  enableBuyerType(selected: string){
    console.log(selected)
    this.sellForm.controls['buyerType'].enable()
    this.sellForm.controls['buyerType'].reset()
    this.sellForm.controls['price'].reset()
  }
  get formFields(){
    return this.sellForm?.controls;
  }
  setPrice(){
    let buyerType = this.sellForm.value.buyerType
    let itemId = this.sellForm.value.item

    if(buyerType&&itemId){
      this.sellPriceQuery.getActiveSellPrice(itemId,buyerType).subscribe(result =>{
        if(result){
          this.sellForm.patchValue({
            'price': result.price
          })
        }else{
          this.showToast(STATUS.WARNING,'Value Missing','Not price was find')
        }
      })
    }

  }
  getSellData():Sell{
    this.sellForm.controls['price'].enable()
    return new Sell('',this.sellForm.value.customer,this.sellForm.value.buyerType,this.sellForm.value.price,this.sellForm.value.item,this.sellForm.value.quantity,new Date());
  }
  getSellPeriod(sellId: string, amount: number):SellPeriod{
    return new SellPeriod('',this.periodTask!.id, sellId, amount,''+new  Date())
  }
  async getSellPrice(itemId: string, buyerType: string):Promise<SellPrice | undefined>{
    return await lastValueFrom(this.sellPriceQuery.getActiveSellPrice(itemId, buyerType).pipe(take(10)))
}
  onBack(){
    this.router.navigate(['/sell/daily'+this.periodTask!.period])
  }
  onSave(){
    if(this.sellForm.invalid) return;
    let sell = this.getSellData();
    if(sell!= null){
      this.sellQuery.createSell(sell, false).subscribe(result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Creation successful','New sell created')
           this.sellPeriodQuery.createSellPeriod(this.getSellPeriod(result.id,result.quantity),false).subscribe(sellPeriod =>{
             console.log('sellPeriod')
             console.log(sellPeriod)
           })
          this.sellForm.reset()
        }else{
          this.showToast(STATUS.DANGER,'Creation fail','Sorry try again later!')
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
