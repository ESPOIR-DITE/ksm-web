export class Sell {
  id: string;
  customerId: string;
  buyerTypeId: string;
  price: number;
  itemId: string;
  quantity: number;
  date: Date;

  constructor(id: string, customerId: string, buyerTypeId: string, price: number, itemId: string, quantity: number, date: Date) {
    this.id = id;
    this.customerId = customerId;
    this.buyerTypeId = buyerTypeId;
    this.price = price;
    this.itemId = itemId;
    this.quantity = quantity;
    this.date = date;
  }
}
