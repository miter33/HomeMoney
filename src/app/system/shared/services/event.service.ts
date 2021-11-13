import { Injectable } from '@angular/core';
import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";
import {AppEvent} from "../models/event.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseApi {

  constructor(protected http: HttpClient) {
    super(http)
  }

  public addEvent(event: AppEvent): Observable<AppEvent> {
     return this.post<AppEvent>('events', event)
  }

  public getEvents(): Observable<AppEvent[]> {
    return this.get<AppEvent[]>('events')
  }

  public getEventById(id: number): Observable<AppEvent> {
    return this.get<AppEvent>(`events/${id}`)
  }
}
