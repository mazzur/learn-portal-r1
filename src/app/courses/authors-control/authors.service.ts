import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  suggestions$ = new Subject<{ users: Array<string>, query: string }>();

  constructor(private httpClient: HttpClient) {
  }

  findAuthors(query: string) {
    this.httpClient.get<Array<string>>(`${ environment.apiUrl }/users`, {
      params: new HttpParams().set('q', query)
    }).subscribe((users) => {
      this.suggestions$.next({
        users,
        query,
      });
    });
  }
}
