import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginPayload } from '../login-payload';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide=true;
  get username(){
    return this.loginForm.get('username');
  }

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService: AuthService,  private router:Router, private snack:MatSnackBar) {
    this.loginForm = new FormGroup({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
    });
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login success');
        Swal.fire('Success','Login Success','success');
        this.router.navigateByUrl('/dashboard');
      }
    },(error:HttpErrorResponse) =>{
      this.snack.open('Invalid Details !! Try again','',{
        duration:3000,
      })
    }
    );
  }
}
