import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidator } from '../components/sign-up/password-validators';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  Email !: string;
  NewPassword!: string;
  hide=true;
  get email(){
    return this.forgotPasswordForm.get('email');

  }
forgotPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router :Router) {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['',[Validators.required]],
      password: [''],
      confirmPassword: ['']
    },{validator: PasswordValidator});
  }

  ngOnInit(): void {
  }

  ForgotPassword() {
  
    const params = new HttpParams()
    .set('email', this.Email)
    .set('NewPassword', this.NewPassword)
    
      
      return this.http.put('http://localhost:8080/api/auth/forgot-password',{}, { params })
      .subscribe(
        response => {
          console.log(response);
          Swal.fire('Success','Password Reset','success');
          this.router.navigateByUrl("/sign-in");
        },
        error => {
          swal.fire({
            title: 'Error',
            text: 'Wrong Details',
            icon: 'error'
          });
        }
      );
    }

}
