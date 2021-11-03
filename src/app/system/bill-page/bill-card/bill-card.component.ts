import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill?: Bill;
  @Input() currency: any;
  public dollar!: number;
  public euro!: number;

  constructor() { }

  ngOnInit(): void {
    const { conversion_rates: rates } = this.currency;
    this.dollar = rates['USD'] * Number(this.bill?.value);
    this.euro = rates['EUR'] * Number(this.bill?.value);
  }
}
