import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BaseApi} from "../core/base-api";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseApi{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getUserByEmail(email: string): Observable<User|undefined> {
    return this.get<User[]>(`users?email=${email}`)
      .pipe(
        map((user: User[]) => user[0] ? user[0] : undefined)
      );
  }

  public createNewUser(user: User): Observable<User> {
    return this.post<User>('users',user)
  }
}
