// import { Component, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  private mode = 'create';
  private postId: string;

  // @Output()
  // postCreatead = new EventEmitter<Post>();

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

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

  ngOnInit() {
      this.route.paramMap.subscribe( (paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.post = this.postsService.getPost(this.postId);
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
