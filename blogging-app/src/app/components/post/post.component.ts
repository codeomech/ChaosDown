import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from 'src/app/image-processing.service';
import { AddPostService } from 'src/app/services/add-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostPayload } from '../user/dashboard/post-blog/post-payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post!: PostPayload;
  permaLink!: Number;

  constructor(private router: ActivatedRoute, private postService: AddPostService,private imageProcessingService:ImageProcessingService,private authService:AuthService) {
  }
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink)
    .pipe(map(p => this.imageProcessingService.CreateImages(p))).
    subscribe((data:PostPayload) => {
      this.post = data;
      console.log(this.post);
    },(err: any) => {
      console.log('Failure Response');
    })
  }

}