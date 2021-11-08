import { Component, OnInit } from '@angular/core';
import {Category} from "../shared/models/category.model";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  public categories: Category[] = [];
  public isLoaded: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) =>{
        this.categories = categories;
        this.isLoaded = true;
      })
  }

  public newCategoryAdded(category: Category): void {
    this.categories.push(category);
  }

  public categoryEdited(category: Category): void {
    const index = this.categories.findIndex(p => p.id === category.id);
    this.categories[index] = category;
  }
}
