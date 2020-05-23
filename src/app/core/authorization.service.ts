import { Injectable } from '@angular/core';
import { storageKeys } from 'App/core/storage-keys';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  authorization$ = new BehaviorSubject<boolean>(!!localStorage.getItem(storageKeys.token));

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  login(credentials: Credentials) {
    return this.httpClient.post<{ access_token: string }>(`${ environment.apiUrl }/auth/login`, credentials)
      .pipe(
        tap(({ access_token }) => {
          localStorage.setItem(storageKeys.token, access_token);
          this.authorization$.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem(storageKeys.token);
    this.authorization$.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem(storageKeys.token);
  }
}
