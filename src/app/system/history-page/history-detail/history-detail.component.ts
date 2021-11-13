import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppEvent} from "../../shared/models/event.model";
import {EventService} from "../../shared/services/event.service";
import {CategoryService} from "../../shared/services/category.service";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  public isLoaded: boolean = false;
  public event!: AppEvent;
  public category!: Category;
  public bill!: Bill;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private categoryService: CategoryService,
    private billService:BillService
  ) { }

  public getCardStyle(): any {
    return {
      'card-success': this.event?.type === 'income',
      'card-danger': this.event?.type === 'outcome'
    };
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub =  this.eventService.getEventById(id)
      .mergeMap((event: AppEvent) => {
        this.event = event;
        return this.categoryService.getCategoryById(event.category)
      })
      .mergeMap((category: Category) => {
        this.category = category;
        return this.billService.getBill()
      })
      .subscribe((bill: Bill) => {
        this.bill = bill;
        this.isLoaded = true;
      })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
