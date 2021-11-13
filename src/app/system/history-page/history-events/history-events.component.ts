import {Component, Input, OnInit} from '@angular/core';
import {AppEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() events: AppEvent[] = [];
  @Input() categories: Category[] = [];
  public searchValue: string = '';
  public searchPlaceholder: string = 'Amount';
  public searchField: string = 'amount';

  constructor() { }

  ngOnInit(): void {
  }

  public getCategoryName(categoryId: string): string {
    const index = this.categories.findIndex(i => i.id === Number(categoryId));
    return this.categories[index].name;
  }

  public getEventClass(event: AppEvent) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income'
    }
  }

  public changeCriteria(field: string): void {
    this.searchPlaceholder = field.charAt(0).toUpperCase() + field.slice(1);
    this.searchField = field;
  }
}
