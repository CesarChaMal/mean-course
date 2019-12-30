"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PostsService = /** @class */ (function () {
    function PostsService(http, router) {
        this.http = http;
        this.router = router;
        this.posts = [];
        // private postsUpdated = new Subject<Post[]>();
        this.postsUpdated = new rxjs_1.Subject();
        this.uri = 'http://localhost:3000/api/posts/';
    }
    PostsService.prototype.getPosts = function (postsPerPage, currentPage) {
        var _this = this;
        var queryParams = "?pagesize=" + postsPerPage + "&page=" + currentPage;
        this.http.get(this.uri + queryParams)
            .pipe(operators_1.map(function (postData) {
            return {
                posts: postData.posts.map(function (post) {
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
            .subscribe(function (transformedPostsData) {
            // this.posts = transformedPosts;
            _this.posts = transformedPostsData.posts;
            // this.postsUpdated.next([...this.posts]);
            _this.postsUpdated.next({ posts: _this.posts.slice(), postCount: transformedPostsData.maxPosts });
        });
    };
    PostsService.prototype.getPostUpdateListener = function () {
        return this.postsUpdated.asObservable();
    };
    PostsService.prototype.getPost = function (id) {
        return this.http.get(this.uri + id);
    };
    PostsService.prototype.addPost = function (title, content, image) {
        var _this = this;
        // const post: Post = { id: null, title: title, content: content };
        var postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.http
            .post(this.uri, postData)
            .subscribe(function (responseData) {
            // const post: Post = { id: responseData.post.id, title: title, content: content, imagePath: responseData.post.imagePath };
            // this.posts.push(post);
            // this.postsUpdated.next([...this.posts]);
            _this.router.navigate(['/']);
        });
    };
    PostsService.prototype.updatePost = function (id, title, content, image) {
        var _this = this;
        // const post: Post = { id: id, title: title, content: content};
        var postData;
        if (typeof image === 'object') {
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        }
        else {
            postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image
            };
        }
        this.http.put(this.uri + id, postData).
            subscribe(function (response) {
            // const updatedPosts = [...this.posts];
            // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
            // const post: Post = {id: id, title: title, content: content, imagePath: ''};
            // updatedPosts[oldPostIndex] = post;
            // console.log(response);
            // this.posts = updatedPosts;
            // this.postsUpdated.next([...this.posts]);
            _this.router.navigate(['/']);
        });
    };
    PostsService.prototype.deletePost = function (postId) {
        // this.http.delete(this.uri + postId)
        // .subscribe(() => {
        //   const updatedPosts = this.posts.filter(post => post.id !== postId);
        //   this.posts = updatedPosts;
        //   this.postsUpdated.next([...this.posts]);
        // });
        return this.http["delete"](this.uri + postId);
    };
    PostsService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], PostsService);
    return PostsService;
}());
exports.PostsService = PostsService;
