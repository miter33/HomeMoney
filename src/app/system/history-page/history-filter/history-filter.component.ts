import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() events: AppEvent[] = [];
  @Input() categories: Category[] = [];
  public selectedPeriod = 'd';
  public timePeriods = [
    {type: 'd', label: 'Day'},
    {type: 'w', label: 'Week'},
    {type: 'M', label: 'Month'}
  ]
  private selectedTypes: Array<string> = [];
  private selectedCategories: Array<number> = [];
  public eventTypes: Array<string> = [];

  constructor() {
  }

  ngOnInit(): void {
    this.eventTypes = [...new Set(this.events.map(i => i.type))]
  }

  public closeFilter(): void {
    this.selectedPeriod = 'd';
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.onFilterCancel.emit();
  }

  public handleChangeType({checked, value}: any): void {
    if (checked) {
      this.selectedTypes.indexOf(value) === -1 ? this.selectedTypes.push(value) : null;
    } else {
      this.selectedTypes = this.selectedTypes.filter(i => i !== value);
    }
  }

  public handleChangeCategory({checked, value}: any): void {
    if (checked) {
      this.selectedCategories.indexOf(value) === -1 ? this.selectedCategories.push(value) : null;
    } else {
      this.selectedCategories = this.selectedCategories.filter(i => i !== value);
    }
  }

  public applyFilter(): void {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }
}
