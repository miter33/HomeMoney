import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bill} from "../shared/models/bill.model";
import {BillService} from "../shared/services/bill.service";
import {EventService} from "../shared/services/event.service";
import {CategoryService} from "../shared/services/category.service";
import {combineLatest, Subscription} from "rxjs";
import {AppEvent} from "../shared/models/event.model";
import {Category} from "../shared/models/category.model";

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  private sub1?: Subscription;
  public isLoaded: boolean = false;
  public bill?: Bill;
  public categories: Category[] = [];
  public events: AppEvent[] = [];
  public progressBar: Array<any> = [];

  constructor(
    private billService: BillService,
    private eventService: EventService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.sub1 = combineLatest([
      this.billService.getBill(),
      this.eventService.getEvents(),
      this.categoryService.getCategories()
    ]).subscribe((data: [Bill, AppEvent[], Category[]]) => {
      this.bill = data[0];
      this.events = data[1];
      this.categories = data[2];
      this.isLoaded = true;
    })
  }

  public getCategoryCost(category: Category): number {
    const categoryEvents = this.events
      .filter((e) => e.category === category.id && e.type === 'outcome')
    return categoryEvents.reduce((a, b) => a + b.amount, 0);
  }

  private getPercent(category: Category): number {
    const percent = (this.getCategoryCost(category)/category.capacity) * 100;
    return percent> 100 ? 100 : percent;
  }

  public getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  public getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
  }
}
