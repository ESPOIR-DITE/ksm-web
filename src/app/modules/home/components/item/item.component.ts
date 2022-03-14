import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../core/models/item/item.model";
import {ItemQuery} from "../../../../core/queries/item/item.query";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
items: Item[] | undefined;
  loading = true;

  constructor(private itemQuery: ItemQuery,
              private toasterService: NbToastrService,
              private route: Router,) { }

  ngOnInit(): void {
    this.itemQuery.getEntities().subscribe(result =>{
      this.items = result;
      this.loading= false;
    })
  }
  onReadItem(id: string){
    this.route.navigate(['/item/view/'+id])
  }
  onCreate(){
    this.route.navigate(['/item/create'])
  }

}
