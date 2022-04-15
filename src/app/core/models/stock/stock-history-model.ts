export class StockHistory{
  id: string;
  ingredientId: string;
  date: Date;
  movingQuantity: number;
  transactionId: string;

  constructor(id: string, ingredientId: string, date: Date, movingQuantity: number, transactionId: string) {
    this.id = id;
    this.ingredientId = ingredientId;
    this.date = date;
    this.movingQuantity = movingQuantity;
    this.transactionId = transactionId;
  }
}
