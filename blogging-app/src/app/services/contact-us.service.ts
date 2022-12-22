import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactUs } from '../components/contact-us';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  addContactUs(contactUs: ContactUs):Observable<ContactUs>{
    return this.httpClient.post<ContactUs>(`${this.baseURL}/contactUs/`,contactUs);
  }
}
