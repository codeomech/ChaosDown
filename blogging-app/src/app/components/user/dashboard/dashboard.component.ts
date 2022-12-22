import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ImageProcessingService } from 'src/app/image-processing.service';
import { AddPostService } from 'src/app/services/add-post.service';

import { AuthService } from 'src/app/services/auth.service';
import { PostPayload } from './post-blog/post-payload';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username=null;
  posts!: Observable<Array<PostPayload>>;
  postDetail = [];

  constructor(private authService: AuthService,private router:Router,private postService: AddPostService,private imageProcessingService: ImageProcessingService) { }

  ngOnInit() {
    this.username=this.authService.getUser();
    this.getAllPost();
    }
  

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/landing-page');
  }
  
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  public getAllPost(){
    this.postService.getAllPosts()
    .pipe(
      map((x:PostPayload[],i)=> x.map(( postPayload : PostPayload)=> this.imageProcessingService.CreateImages(postPayload)))
    )
    .subscribe(
      (resp:PostPayload[])=>{
        console.log(resp);
        this.postDetail =resp;
      },(error:HttpErrorResponse) =>{
        console.log(error);
      }
    )
  }


}
