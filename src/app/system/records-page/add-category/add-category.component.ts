import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../shared/services/category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{
  @Output() onCategoryAdd = new EventEmitter<Category>();
  private sub?:Subscription;

  constructor(private categoryService: CategoryService) { }

  public onSubmit(form: NgForm): void {
    const {name, capacity} = form.value;
    const category = new Category(name, capacity)
    this.sub = this.categoryService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1})
        this.onCategoryAdd.emit(category);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
