export class ItemIngredient {
  fakeId: string;
  entryId: string;
  ingredientId: string;
  quantity: number;
  description: string;

  constructor(fakeId: string,entryId: string, ingredientId: string, quantity: number, description: string) {
    this.fakeId = fakeId;
    this.entryId = entryId;
    this.ingredientId = ingredientId;
    this.quantity = quantity;
    this.description = description;
  }
}
