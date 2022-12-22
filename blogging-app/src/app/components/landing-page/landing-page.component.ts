import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { map, Observable } from 'rxjs';
import { ImageProcessingService } from 'src/app/image-processing.service';
import { AddPostService } from 'src/app/services/add-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostPayload } from '../user/dashboard/post-blog/post-payload';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  postDetail = [];
  // postPayload!: PostPayload;
  constructor(private postService: AddPostService,private authService: AuthService,
    private imageProcessingService: ImageProcessingService) { 
    }

    

  ngOnInit() {
    this.getAllPost();
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