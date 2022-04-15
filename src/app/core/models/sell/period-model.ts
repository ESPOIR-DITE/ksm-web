export  class Period {
  id: string;
  period: string;
  description: string;

  constructor(id: string, period: string, description: string) {
    this.id = id;
    this.period = period;
    this.description = description;
  }
}
