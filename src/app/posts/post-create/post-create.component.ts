// import { Component, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
// import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  // @Output()
  // postCreatead = new EventEmitter<Post>();

  constructor(public postsService: PostsService) {}

  // onAddPost(form: NgForm) {
  //   // const post: Post = {
  //   //   title: this.enteredTitle,
  //   //   content: this.enteredContent
  //   // };
  //   if (form.invalid) {
  //     return;
  //   }
  //   const post: Post = {
  //     title: form.value.title,
  //     content: form.value.content
  //   };
  //   this.postCreatead.emit(post);
  // }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
