import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {AppEvent} from "../../shared/models/event.model";
import {NgForm} from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Input() categories: Category[] = [];
  public types: Array<string> = [
    'Income', 'Outcome'
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {

    const {type, amount, category, description} = form.value;
    const event = new AppEvent(
      type, amount, category, moment().format('DD.MM.YYYY HH:mm:ss'), description
    )
    // this.categoryService.updateCategory(category)
    //   .subscribe((category: Category) => {
    //     this.message.text = 'Category was edited successfully'
    //     this.onCategoryEdit.emit(category);
    //     setTimeout(() => {
    //       this.message.text = ''
    //     }, 5000)
    //   });
  }
}
