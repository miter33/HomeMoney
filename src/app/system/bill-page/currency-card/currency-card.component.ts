import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency: any;
  public currencies: Array<string> = ['USD', 'EUR'];
  public dollar!: number;
  public euro!: number;
  public date!: string;
  public rates: any;

  constructor() { }

  ngOnInit(): void {
    const { conversion_rates: rates } = this.currency;
    const { time_last_update_utc: date } = this.currency;
    this.dollar = rates['USD'];
    this.euro = rates['EUR'];
    this.date = date;
    this.rates = rates;
  }

}
