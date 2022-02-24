export  class IngredientTransaction {
  entryId: string;
  transactionId: string;
  ingredientId: string;
  quantity: string;
  price: number;
  brand: string;
  date: Date;
  expirationDate: Date;

  constructor(entryId: string, transactionId: string, ingredientId: string, quantity: string, price: number, brand: string, date: Date, expirationDate: Date) {
    this.entryId = entryId;
    this.transactionId = transactionId;
    this.ingredientId = ingredientId;
    this.quantity = quantity;
    this.price = price;
    this.brand = brand;
    this.date = date;
    this.expirationDate = expirationDate;
  }
}
