import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterPayload } from '../components/register-payload';

import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import { LoginPayload } from '../components/login-payload';
import { JwtAutResponse } from '../components/jwt-aut-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private url = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService ) {
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload)
    }
  

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      this.localStoraqeService.store('authenticationToken', data.authenticationToken);
      this.localStoraqeService.store('username', data.username);
      localStorage.setItem('username',JSON.stringify(data.username));
      return true;
    }));
  }
  isAuthenticated(): boolean {
    return this.localStoraqeService.retrieve('username') != null;
  }

  public isLoggedIn(){
    let tokenStr=localStorage.getItem('authenticationToken');
    if(tokenStr==undefined || tokenStr == '' || tokenStr==null){
      return false;
    } else{
      return true;
    }
  }

  logout() {
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
  }

  public setUser(username){
    localStorage.setItem('username',JSON.stringify(username));
  }

 


  public getUser(){
    let userStr=localStorage.getItem('username');
    if(userStr != null){
      return JSON.parse(userStr);
    } else{
      return null;
    }
  }


}