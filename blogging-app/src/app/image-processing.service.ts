import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './components/user/dashboard/post-blog/file-handle.model';
import { PostPayload } from './components/user/dashboard/post-blog/post-payload';


@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanatizer : DomSanitizer) { }

  public CreateImages(postPayload:PostPayload){
    const postImages:any = postPayload.postImages;

    const postImagesToFileHandle: FileHandle[] =[];

    for(let i=0;i<postImages.length;i++){
      const imageFileData = postImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte,imageFileData.type);
      const imageFile =   new File([imageBlob], imageFileData.name,{type: imageFileData.type});

    const finalFileHandle: FileHandle={
      file: imageFile,
      url: this.sanatizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };
    postImagesToFileHandle.push(finalFileHandle);
    }
    postPayload.postImages = postImagesToFileHandle;
    return postPayload;
  }

  public dataURItoBlob(picBytes,imageType){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

   for(let i=0;i<byteString.length;i++){
    int8Array[i] = byteString.charCodeAt(i);
   }
   const blob = new Blob([int8Array],{type:imageType});
   return blob;
  }
}