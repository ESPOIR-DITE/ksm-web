export class ItemIngredient {
  id: string;
  entryId: string;
  ingredientId: string;
  quantity: number;
  description: string;

  constructor(id: string,entryId: string, ingredientId: string, quantity: number, description: string) {
    this.id = id;
    this.entryId = entryId;
    this.ingredientId = ingredientId;
    this.quantity = quantity;
    this.description = description;
  }
}
