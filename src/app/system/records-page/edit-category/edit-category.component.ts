import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoryService} from "../../shared/services/category.service";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  public currentCategoryId?: number;
  public currentCategory?: Category;
  public message!: Message;
  private sub?: Subscription;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.message = new Message('success', '');
    this.currentCategoryId = this.categories[0]?.id;
    this.onCategoryChange();
  }

  public onCategoryChange(): void {
    this.currentCategory = this.categories
      .find(i => i.id === Number(this.currentCategoryId))
  }

  public onSubmit(form: NgForm): void {
    const {name, capacity} = form.value;
    const category = new Category(name, capacity, Number(this.currentCategoryId))
    this.sub = this.categoryService.updateCategory(category)
      .subscribe((category: Category) => {
        this.message.text = 'Category was edited successfully'
        this.onCategoryEdit.emit(category);
        setTimeout(() => {
          this.message.text = ''
        }, 5000)
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
