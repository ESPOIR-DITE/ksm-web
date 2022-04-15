export class SellPeriod{
  id: string;
  periodId: string;
  sellId: string;
  amount: number;
  description: string;

  constructor(id: string, periodId: string, sellId: string, amount: number, description: string) {
    this.id = id;
    this.periodId = periodId;
    this.sellId = sellId;
    this.amount = amount;
    this.description = description;
  }
}
