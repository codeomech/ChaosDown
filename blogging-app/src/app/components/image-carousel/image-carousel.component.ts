import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router ) { }

  ngOnInit(): void {
  }

   logout() {
    this.authService.logout();
    this.router.navigateByUrl('/landing-page');
  }
  
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

}
