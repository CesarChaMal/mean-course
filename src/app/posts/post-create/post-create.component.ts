// import { Component, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  isLoading = false;
  // Reactive forms
  form: FormGroup;
  // Reactive forms
  imagePreview: string;
  private mode = 'create';
  private postId: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    // Reactive forms
    // this.form = new FormGroup({
      //   'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      //   'content': new FormControl(null, {validators: [Validators.required]}),
      //   'image': new FormControl(null, {validators: [Validators.required]})
      // });
      // Reactive forms
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData.id, title: postData.title, content: postData.content, imagePath: postData.imagePath};
          console.log(postData.imagePath);
          console.log(this.post.imagePath);
          // Reactive Forms
          this.form.setValue({title: this.post.title, content: this.post.content, image: this.post.imagePath });
          // Reactive Forms
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.form);
  }

  // Angular Forms
  // onSavePost(form: NgForm) {
  // Reactive Forms
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    // this.form.reset
    this.form.reset();
  }
}

