import {Ingredient} from "../ingredient/ingredient.model";
import {IngredientTransaction} from "../ingredient/ingredient-transaction.model";
import {Transaction} from "./transaction.model";

export class EntryIngredientPresentation {
  entry: Transaction;
  ingredientEntry: StockIngredient[];

  constructor(entry: Transaction, ingredientEntry: StockIngredient[]) {
    this.entry = entry;
    this.ingredientEntry = ingredientEntry;
  }
}
export class StockIngredient {
  private ingredient: Ingredient;
  private ingredientTransaction: IngredientTransaction;

  constructor(ingredient: Ingredient, ingredientTransaction: IngredientTransaction) {
    this.ingredient = ingredient;
    this.ingredientTransaction = ingredientTransaction;
  }
}
