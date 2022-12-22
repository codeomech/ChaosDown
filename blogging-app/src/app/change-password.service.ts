import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) {
   }

   changePassword(username: string, currentPassword: string, newPassword: string) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const body = {
      username: username,
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    console.log(username);
    console.log(currentPassword);
    console.log(newPassword)
    return this.http.put('http://localhost:8080/api/auth/change-password', body,httpOptions)
    .subscribe(response => {
      console.log(response);
    });
  }

}


