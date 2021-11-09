import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {AppEvent} from "../../shared/models/event.model";
import {NgForm} from "@angular/forms";
import * as moment from 'moment';
import {EventService} from "../../shared/services/event.service";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../shared/models/bill.model";
import "rxjs/add/operator/mergeMap";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  public types: Array<string> = [
    'income', 'outcome'
  ]
  public message!: Message;
  private sub1?: Subscription;
  private sub2?: Subscription;

  constructor(
    private eventService: EventService,
    private billService: BillService
  ) {
  }

  ngOnInit(): void {
    this.message = new Message('danger', '')
  }

  public onSubmit(form: NgForm): void {
    const {type, amount, category, description} = form.value;
    const event = new AppEvent(
      type, amount, Number(category), moment().format('DD.MM.YYYY HH:mm:ss'), description
    );

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (bill.value < amount) {
            this.showMessage(`It is not enough money on the bill. You lack of ${amount-bill.value} ${bill.currency}`)
            return;
          } else {
            value = bill.value - amount
          }
        } else {
          value = bill.value + amount
        }

        this.sub2 = this.billService.updateBill(new Bill(value, bill.currency))
          .mergeMap(() => this.eventService.addEvent(event))
          .subscribe(() => {
            form.setValue({
              amount: 1,
              category: 1,
              type: 'outcome',
              description: ' '
            })
          })
      })
  }
  private showMessage(text: string): void {
    this.message.text = text;
    setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
