export class Ingredient {
  id: string;
  name: string;
  description: string;
  quantityType: string;
  brand: string;
  price: number;

  constructor(id: string, name: string, description: string, quantityType: string, brand: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantityType = quantityType;
    this.brand = brand;
    this.price = price;
  }
}
