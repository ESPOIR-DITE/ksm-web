export  class IngredientTransaction {
  id: string;
  entryId: string;
  transactionId: string;
  ingredientId: string;
  quantity: number;
  price: number;
  brand: string;
  date: Date;
  expirationDate: Date;

  constructor(id: string,entryId: string, transactionId: string, ingredientId: string, quantity: number, price: number, brand: string, date: Date, expirationDate: Date) {
    this.id= id;
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
