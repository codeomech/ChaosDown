import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ImageProcessingService } from 'src/app/image-processing.service';
import { AddPostService } from 'src/app/services/add-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostPayload } from '../user/dashboard/post-blog/post-payload';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts!: Observable<Array<PostPayload>>;
  postDetail = [];
  term!: string;
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
