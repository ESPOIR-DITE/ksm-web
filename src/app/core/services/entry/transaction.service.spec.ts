import {TransactionService} from "./transaction.service";
import {HttpClient} from "@angular/common/http";
import {TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {transaction} from "@datorama/akita";

describe('TransactionService', () => {
  let service: TransactionService;
  let http: HttpClient;
  let store: TransactionStore;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionStore],
    })
    service = TestBed.inject(TransactionService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('service created', () =>{
    expect(service).toBeDefined();
  });

  it('service transaction', () =>{
      const transactionObject = {
         id:'',
         amount:2000,
         date:new Date(),
         supplier:'FoodDistics',
         transactionTypeId:'uirri7575'};
    service.createEntity(transactionObject).subscribe( result => {
      console.log(result);
      expect(result.body).toBe(transactionObject);
    })
  });


})
