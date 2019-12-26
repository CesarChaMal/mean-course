import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    const uri = 'http://localhost:3000/api/posts';
    this.http
      .get<{ message: string; posts: any }>(uri)
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // getPosts() {
  //   return this.posts;
  // }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return {...this.posts.find(p => p.id === id)};
  }

  addPost(title: string, content: string) {
    const uri = 'http://localhost:3000/api/posts';
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>(uri, post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost() {

  }

  deletePost(postId: string) {
    const uri = 'http://localhost:3000/api/posts/';
    this.http.delete(uri + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
