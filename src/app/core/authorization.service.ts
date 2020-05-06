import { Injectable } from '@angular/core';
import { storageKeys } from 'App/core/storage-keys';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private router: Router, private httpClient: HttpClient) {
  }

  login(credentials: Credentials) {
    return this.httpClient.post<{ access_token: string }>(`${ environment.apiUrl }/auth/login`, credentials)
      .pipe(
        tap(({ access_token }) => {
          localStorage.setItem(storageKeys.token, access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem(storageKeys.token);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(storageKeys.token);
  }
}
