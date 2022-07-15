export class Item {
  id: string;
  name: string;
  costPrice: number;
  description: string;
  icon: string;
  image: string;

  constructor(id: string, name: string, costPrice: number, description: string, icon: string, image: string) {
    this.id = id;
    this.name = name;
    this.costPrice = costPrice;
    this.description = description;
    this.icon = icon;
    this.image = image;
  }
}
