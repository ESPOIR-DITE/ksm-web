export class Transaction {
  id: string;
  amount: number;
  date: Date;
  supplier: string;
  transactionTypeId: string

  constructor(id: string, amount: number, date: Date, supplier: string, transactionTypeId: string) {
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.supplier = supplier;
    this.transactionTypeId = transactionTypeId;
  }
}
