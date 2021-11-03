import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";
import {Currency} from "../../shared/models/currency.model";

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill?: Bill;
  @Input() currency?: Currency;
  public dollar!: number;
  public euro!: number;

  constructor() { }

  ngOnInit(): void {
    this.dollar = this.currency?.conversion_rates['USD'] * Number(this.bill?.value);
    this.euro = this.currency?.conversion_rates['EUR'] * Number(this.bill?.value);
  }
}
