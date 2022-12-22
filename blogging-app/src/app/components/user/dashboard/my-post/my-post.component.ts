import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ImageProcessingService } from 'src/app/image-processing.service';
import { AddPostService } from 'src/app/services/add-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostPayload } from '../post-blog/post-payload';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  username={};
  post!: PostPayload;
  permaLink!: Number;
  posts!: Observable<Array<PostPayload>>;
  postDetail = [];
  noofpost !: 0 
   

  constructor(private authService: AuthService,private router:Router,private postService: AddPostService,private imageProcessingService: ImageProcessingService,) { }

  ngOnInit() {
    this.getAllPost();
    this.username=this.authService.getUser();
    this.count();
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
  deletePost(id){
    this.postService.DeletePost(id).subscribe(
      (resp)=>{
        // console.log(resp)
        location.reload();

      },
      (error:HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }
  count(){
    for (var p of this.postDetail){
      if(this.username == this.post.username){
           console.log("klpd");
           this.noofpost++;
      }
      console.log(this.noofpost);
    }
  }

}
