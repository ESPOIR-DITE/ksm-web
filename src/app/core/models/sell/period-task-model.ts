export  class PeriodTask {
  id: string;
  period: string;
  date: Date;
  time: Date;
  description: string;


  constructor(id: string, period: string, date: Date, time: Date, description: string) {
    this.id = id;
    this.period = period;
    this.date = date;
    this.time = time;
    this.description = description;
  }
}
