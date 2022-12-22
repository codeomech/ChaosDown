
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import {RegisterPayload} from '../register-payload';

import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidator } from './password-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {
  hide=true;
  get username(){
    return this.registerForm.get('username');
  }
  get email(){
    return this.registerForm.get('email');

  }

  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['',[Validators.required],[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: [''],
      confirmPassword: ['']
    },{validator: PasswordValidator});
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;

    this.authService.register(this.registerPayload).subscribe(data => {
      console.log('register succes');
      Swal.fire('Success','User is registered','success');
      this.router.navigateByUrl('/sign-in');
    }, error => {
      console.log('register failed');
    });
  }
}
