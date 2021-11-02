import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class BaseApi {
  private baseUrl: string = 'http://localhost:3000/'

  constructor(protected http: HttpClient) {
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get<T>(url: string = ''): Observable<T> {
    return this.http.get<T>(this.getUrl(url));
  }

  public post<T>(url: string = '', data: T): Observable<T> {
    return this.http.post<T>(this.getUrl(url), data);
  }

  public put<T>(url: string = '', data: T): Observable<T> {
    return this.http.put<T>(this.getUrl(url), data);
  }
}
