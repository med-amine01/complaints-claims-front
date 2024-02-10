import {Injectable} from '@angular/core';
import {Role} from "../common/role";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {
  }

  public setRoles(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem('jwtToken');
  }

  public setUserUid(id: string) {
    localStorage.setItem('userUid', id);
  }

  public getUserUid() {
    return localStorage.getItem('userUid');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return Boolean(this.getRoles() && this.getToken());
  }
}
