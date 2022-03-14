import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../../../../../core/models/ingredient/ingredient.model";
import {IngredientQuery} from "../../../../../core/queries/ingredient/ingredient.query";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-entry-create-form',
  templateUrl: './entry-create-form.component.html',
  styleUrls: ['./entry-create-form.component.scss']
})
export class EntryCreateFormComponent implements OnInit {
  ingredients: Ingredient[]|undefined;
  transactionForm = new FormGroup({
    entryId: new FormControl('', Validators.required),
    transactionId: new FormControl('', Validators.required),
    ingredientId: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    supplier: new FormControl(''),
    date: new FormControl(new Date()),

  })

  constructor(private ingredientQuery: IngredientQuery,
              private toasterService: NbToastrService,
              private route: Router
              ) { }

  ngOnInit(): void {
  }

}
