import { NotificationService } from './../../shared/notifcation/notification.service';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postText: string = null;
  postImages = new Array<File>();
  fileInputButtonText = 'Select images...';

  constructor(
    private postService: PostService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  loadFiles(files: File[]): void {
    this.postImages = new Array<File>();
    for (const file of files) {
      if (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png') {
        if (this.postImages.length <= 10) {
          this.postImages.push(file);
        } else {
          this.notificationService.warn('You can upload up to 10 photos!');
        }
      } else {
        this.notificationService.error('File ' + file.name + ' is not an image!');
      }
    }
    if (this.postImages.length === 1) {
      this.fileInputButtonText = '1 Image';
    } else {
      this.fileInputButtonText = this.postImages.length + ' Images';
    }
  }

  addPost(): void {
    const request = new FormData();
    if (this.postText != null) {
      request.append('textContent', this.postText);
    }

    this.postImages.forEach(
      file => {
        request.append('images', file, file.name);
      }
    );

    if (request.has('textContent') || request.has('images')) {
      this.postService.sendPostRequest(request).subscribe(
        data => {
          console.log(data);
        },
        error => {
        }
      );

      this.postText = null;

      this.notificationService.success('Post has been uploaded!');
    } else {
      this.notificationService.error('Post must contain any text or at least one image!');
    }
  }
}
