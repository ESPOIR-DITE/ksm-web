export  class IngredientTransaction {
  fakeId: string;
  entryId: string;
  transactionId: string;
  ingredientId: string;
  quantity: string;
  price: number;
  brand: string;
  date: Date;
  expirationDate: Date;

  constructor(fakeId: string,entryId: string, transactionId: string, ingredientId: string, quantity: string, price: number, brand: string, date: Date, expirationDate: Date) {
    this.fakeId= fakeId;
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
