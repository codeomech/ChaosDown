import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostPayload } from './post-payload';
import { Router } from '@angular/router';
import { AddPostService } from 'src/app/services/add-post.service';
import { FileHandle } from './file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css'],
})
export class PostBlogComponent implements OnInit {
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
  };
  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(
    private addPostService: AddPostService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body,
    });
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: '',
      postImages: [],
    };
  }

  ngOnInit(): void {}

  addPost() {
    const bodyControl = this.addPostForm.get('body');
    const titleControl = this.addPostForm.get('title');
    if (bodyControl) {
      this.postPayload.content = bodyControl.value;
    }
    if (titleControl) {
      this.postPayload.content = titleControl.value;
    }
    const PostFormData = this.prepareFormData(this.postPayload);

    this.addPostService.addPost(PostFormData).subscribe(
      (data) => {
        console.log('Add post Successfully');
        this.router.navigateByUrl('/landing-page');
      },
      (error) => {
        console.log('Failure Response');
      }
    );
  }

  prepareFormData(postPayload: PostPayload): FormData {
    const formData = new FormData();

    formData.append(
      'Post',
      new Blob([JSON.stringify(postPayload)], { type: 'application/json' })
    );
    for (var i = 0; i < postPayload.postImages.length; i++) {
      formData.append(
        'imageFile',
        postPayload.postImages[i].file,
        postPayload.postImages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.postPayload.postImages.push(fileHandle);
    }
  }

  fileDropped(fileHandle: FileHandle) {
    this.postPayload.postImages.push(fileHandle);
  }

  removeImages(i: number) {
    this.postPayload.postImages.splice(i, 1);
  }
}
