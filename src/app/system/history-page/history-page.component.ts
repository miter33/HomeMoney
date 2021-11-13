import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {EventService} from "../shared/services/event.service";
import {combineLatest, Subscription} from "rxjs";
import {Category} from "../shared/models/category.model";
import {AppEvent} from "../shared/models/event.model";
import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  public events: AppEvent[] = [];
  public isLoaded: boolean = false;
  public chartData: any = [];
  private sub?: Subscription;
  public isFilterVisible: boolean = false;
  public filteredEvents: AppEvent[] = [];

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService
  ) { }

  public openFilter(): void {
    this.toggleFilterVisibility(true);
  }

  public onFilterApply(filterData: any) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period);
    const endPeriod = moment().endOf(filterData.period);

    this.filteredEvents = this.filteredEvents
      .filter((e: AppEvent) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e: AppEvent) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e: AppEvent) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      })

    this.calculateChartData();
  }

  public onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  public ngOnInit(): void {
    this.sub = combineLatest([
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ]).subscribe((data: [Category[], AppEvent[]]) => {
      this.categories = data[0];
      this.events = data[1]
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    })
  }

  private setOriginalEvents(): void {
    this.filteredEvents = this.events.slice();
  }

  private calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category: Category) => {
      const catEvent = this.filteredEvents
        .filter(e => e.category === category.id && e.type === 'outcome')
      this.chartData.push({
        name: category.name,
        value: catEvent.reduce((a, b) => a + b.amount, 0)
      })
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
