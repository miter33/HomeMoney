import {Component, Input, OnInit} from '@angular/core';
import {Currency} from "../../shared/models/currency.model";

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency?: Currency;
  public currencies: Array<string> = ['USD', 'EUR'];
  public dollar!: number;
  public euro?: number;
  public date?: Date;
  public rates: any;

  constructor() { }

  ngOnInit(): void {
    this.dollar = this.currency?.conversion_rates['USD'];
    this.euro = this.currency?.conversion_rates['EUR'];
    this.date = this.currency?.time_last_update_utc;
    this.rates = this.currency?.conversion_rates;
  }

}
