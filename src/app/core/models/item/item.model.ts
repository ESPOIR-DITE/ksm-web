export class Item {
  id: string;
  name: string;
  costPrice: number;
  description: string;

  constructor(id: string, name: string, costPrice: number, description: string) {
    this.id = id;
    this.name = name;
    this.costPrice = costPrice;
    this.description = description;
  }
}
