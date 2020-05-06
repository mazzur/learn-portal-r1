import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { storageKeys } from 'App/core/storage-keys';
import { tap } from 'rxjs/operators';
import { User } from 'App/core/user';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from 'App/core/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService,
  ) { }

  getUser(): Observable<User | null> {
    if (!this.authorizationService.isAuthenticated()) {
      localStorage.removeItem(storageKeys.user);
      return of(null);
    }

    const storedUserData = localStorage.getItem(storageKeys.user);

    if (storedUserData) {
      return of<User>(JSON.parse(storedUserData));
    }

    return this.http.get<User>(`${environment.apiUrl}/user/profile`)
      .pipe(
        tap((userData) => {
          localStorage.setItem(storageKeys.user, JSON.stringify(userData));
        })
      );
  }
}
