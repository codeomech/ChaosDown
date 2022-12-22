import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePasswordService } from 'src/app/change-password.service';
import { ProfilePayload } from './profile-payload';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username !: string;
  currentPassword!: string;
  newPassword!: string;
  nhide = true;
  hide = true;

  constructor(private authService: AuthService,private http: HttpClient) {
   }


  ngOnInit(): void {
    this.username=this.authService.getUser();
  }

  onSubmit(){
  }


  changePassword() {

  const params = new HttpParams()
  .set('user_name', this.username)
  .set('currentPassword', this.currentPassword)
  .set('newPassword', this.newPassword);

    // console.log(body);
    
    return this.http.put('http://localhost:8080/api/auth/change-password',{}, { params })
    .subscribe(
      response => {
        console.log(response);
        Swal.fire('Success','Password Changed','success');
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Wrong Details',
          icon: 'error'
        });
      }
    );
  }

}
