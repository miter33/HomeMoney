import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {combineLatest, Observable, Subscription} from "rxjs";
import {Bill} from "../shared/models/bill.model";

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(private billService: BillService) {
  }

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.billService.getBill(),
      this.billService.getCurrency()
      ]).subscribe((data: [Bill, any]) => {
      console.log(data)
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
