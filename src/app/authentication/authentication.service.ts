import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://dummyjson.com/auth/login';
  private token = 'authToken';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, {username, password}).pipe(
      tap((response: any) => {
      if (response.token){
        localStorage.setItem(this.token, response.token);
      }
    })
    )
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.token);
  }

  logout(): void {
    localStorage.removeItem(this.token); // Clear the token from local storage
  }

}
