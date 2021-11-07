import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";
import {Currency} from "../models/currency.model";

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApi{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getBill(): Observable<Bill> {
    return this.get<Bill>('bill');
  }

  public getCurrency(currency: string = 'RUB'): Observable<Currency> {
    return this.http.get<Currency>(`https://v6.exchangerate-api.com/v6/41cbb19d4b9d989303bdc5d1/latest/${currency}`);
  }
}
