export class ItemIngredient {
  entryId: string;
  ingredientId: string;
  quantity: number;
  description: string;

  constructor(entryId: string, ingredientId: string, quantity: number, description: string) {
    this.entryId = entryId;
    this.ingredientId = ingredientId;
    this.quantity = quantity;
    this.description = description;
  }
}
