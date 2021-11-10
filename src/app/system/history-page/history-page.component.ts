import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {EventService} from "../shared/services/event.service";
import {combineLatest, Subscription} from "rxjs";
import {Category} from "../shared/models/category.model";
import {AppEvent} from "../shared/models/event.model";

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

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.sub = combineLatest([
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ]).subscribe((data: [Category[], AppEvent[]]) => {
      this.categories = data[0];
      this.events = data[1]
      this.calculateChartData();
      this.isLoaded = true;
    })
  }

  private calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category: Category) => {
      const catEvent = this.events
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
