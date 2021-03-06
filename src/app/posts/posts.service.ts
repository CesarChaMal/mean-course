import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  // private postsUpdated = new Subject<Post[]>();
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();
  private uri = 'http://localhost:3000/api/posts/';

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; posts: any, maxPosts: number}>(this.uri + queryParams)
    .pipe(map((postData) => {
      return {
        posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        }),
        maxPosts: postData.maxPosts
      };
    }))
    .subscribe(transformedPostsData => {
      // this.posts = transformedPosts;
      this.posts = transformedPostsData.posts;
      // this.postsUpdated.next([...this.posts]);
      this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostsData.maxPosts});
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{id: string, title: string, content: string, imagePath: string}>(this.uri + id);
  }

  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: null, title: title, content: content };
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
    .post<{ message: string, post: Post }>(this.uri, postData)
    .subscribe(responseData => {
      // const post: Post = { id: responseData.post.id, title: title, content: content, imagePath: responseData.post.imagePath };
      // this.posts.push(post);
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    // const post: Post = { id: id, title: title, content: content};
    let postData: Post | FormData;

    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http.put(this.uri + id, postData).
    subscribe(response => {
      // const updatedPosts = [...this.posts];
      // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      // const post: Post = {id: id, title: title, content: content, imagePath: ''};
      // updatedPosts[oldPostIndex] = post;
      // console.log(response);
      // this.posts = updatedPosts;
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
}

  deletePost(postId: string) {
    // this.http.delete(this.uri + postId)
    // .subscribe(() => {
    //   const updatedPosts = this.posts.filter(post => post.id !== postId);
    //   this.posts = updatedPosts;
    //   this.postsUpdated.next([...this.posts]);
    // });
    return this.http.delete(this.uri + postId);
  }
}

