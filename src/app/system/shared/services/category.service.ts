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

  public getCategories(): Observable<Category[]> {
    return this.get<Category[]>('categories')
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.put<Category>(`categories/${category.id}`, category)
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.get<Category>(`categories/${id}`)
  }
}
