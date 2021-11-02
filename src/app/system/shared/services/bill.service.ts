import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../models/bill.model";
import {tap} from "rxjs/operators";
import {BaseApi} from "../../../shared/core/base-api";

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

  public getCurrency(currency: string = 'RUB'): Observable<any> {
    return this.http.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.json`)
  }
}
