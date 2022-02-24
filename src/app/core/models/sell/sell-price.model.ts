export class SellPrice {
  id: string;
  itemId: string;
  buyerTypeId: string;
  price: number;
  date: Date;
  isActivr: boolean;

  constructor(id: string, itemId: string, buyerTypeId: string, price: number, date: Date, isActivr: boolean) {
    this.id = id;
    this.itemId = itemId;
    this.buyerTypeId = buyerTypeId;
    this.price = price;
    this.date = date;
    this.isActivr = isActivr;
  }
}
