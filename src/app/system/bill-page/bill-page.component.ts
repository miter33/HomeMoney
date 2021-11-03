import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {combineLatest, Observable, Subscription} from "rxjs";
import {Bill} from "../shared/models/bill.model";
import {Currency} from "../shared/models/currency.model";

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  private sub1?: Subscription;
  private sub2?: Subscription;
  public currency?: Currency;
  public bill?: Bill;
  public isLoaded: boolean = false;

  constructor(private billService: BillService) {
  }

  ngOnInit(): void {
    this.sub1 = combineLatest([
      this.billService.getBill(),
      this.billService.getCurrency()
      ]).subscribe((data: [Bill, Currency]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
    })
  }

  public onRefresh(): any {
    this.isLoaded = false;
    this.sub2 =  this.billService.getCurrency()
      .subscribe((currency: Currency) => {
        this.currency = currency;
        this.isLoaded = true;
      })
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
