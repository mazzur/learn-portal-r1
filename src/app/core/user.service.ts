import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { storageKeys } from 'App/core/storage-keys';
import { tap } from 'rxjs/operators';
import { User } from 'App/core/user';
import { BehaviorSubject, Observable, of, Subscriber } from 'rxjs';
import { AuthorizationService } from 'App/core/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService,
  ) {
    const storedUserData = localStorage.getItem(storageKeys.user);

    if (storedUserData) {
      this.user$.next(JSON.parse(storedUserData));
    }

    this.authorizationService.authorization$
      .subscribe((isAuthorized) => {
        if (!isAuthorized) {
          this.updateUserData(null);
        } else {
          this.getUser();
        }
      });
  }

  getUser() {
    this.http.get<User>(`${environment.apiUrl}/user/profile`)
      .subscribe((userData) => this.updateUserData(userData));
  }

  private updateUserData(userData: User | null) {
    localStorage.setItem(storageKeys.user, JSON.stringify(userData));
    this.user$.next(userData);
  }
}
