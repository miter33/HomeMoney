import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category.model";
import {Observable} from "rxjs";
import {BaseApi} from "../../../shared/core/base-api";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseApi{

  constructor(protected http: HttpClient) {
    super(http)
  }

  public addCategory(category: Category): Observable<Category> {
    return this.post<Category>('categories', category);
  }
}
