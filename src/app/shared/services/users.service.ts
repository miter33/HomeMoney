import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUserByEmail(email: string): Observable<User|undefined> {
    return this.http.get<User[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((user: User[]) => user[0] ? user[0] : undefined)
      );
  }

  public createNewUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users',user)
  }
}
