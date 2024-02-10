import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginResponse} from "../common/login-response";
import {User} from "../common/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_AUTH_API = 'http://localhost:3030/api/v1/auth';
  private BASE_USER_API = 'http://localhost:3030/api/v1/users';

  constructor(private httpClient: HttpClient) {
  }

  public login(loginRequest: any): Observable<LoginResponse> {
    const loginUrl = this.BASE_AUTH_API + '/token';
    return this.httpClient.post<LoginResponse>(loginUrl, loginRequest);
  }

  // public getUserByName(username: string) : Observable<User> {
  //   const url = this.BASE_USER_API + '/' + username;
  //   return this.httpClient.get<User>(url);
  // }

  getUserByName(username: string): Observable<User> {
    const url = `${this.BASE_USER_API}/${username}`;
    return this.httpClient.get<User>(url).pipe(
      map((response: any) => {
        const user: User = new User();
        user.name = response.results.userName,
        user.email = response.results.email,
        user.roles = response.results.roles

        return user;
      })
    );
  }
}
