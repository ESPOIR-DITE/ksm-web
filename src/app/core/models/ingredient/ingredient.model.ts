export class Ingredient {
  id: string;
  name: string;
  description: string;
  quantityType: string;
  brand: string;

  constructor(id: string, name: string, description: string, quantityType: string, brand: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantityType = quantityType;
    this.brand = brand;
  }
}
