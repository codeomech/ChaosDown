import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   username = null;
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/landing-page');
  }
  
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }



}
