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
        this.postsUpdated = new rxjs_1.Subject();
        this.uri = 'http://localhost:3000/api/posts/';
    }
    PostsService.prototype.getPosts = function () {
        var _this = this;
        this.http.get(this.uri)
            .pipe(operators_1.map(function (postData) {
            return postData.posts.map(function (post) {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id,
                    imagePath: post.imagePath
                };
            });
        }))
            .subscribe(function (transformedPosts) {
            _this.posts = transformedPosts;
            _this.postsUpdated.next(_this.posts.slice());
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
            var post = { id: responseData.post.id, title: title, content: content, imagePath: responseData.post.imagePath };
            _this.posts.push(post);
            _this.postsUpdated.next(_this.posts.slice());
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
            var updatedPosts = _this.posts.slice();
            var oldPostIndex = updatedPosts.findIndex(function (p) { return p.id === id; });
            var post = { id: id, title: title, content: content, imagePath: '' };
            updatedPosts[oldPostIndex] = post;
            console.log(response);
            _this.posts = updatedPosts;
            _this.postsUpdated.next(_this.posts.slice());
            _this.router.navigate(['/']);
        });
    };
    PostsService.prototype.deletePost = function (postId) {
        var _this = this;
        this.http["delete"](this.uri + postId)
            .subscribe(function () {
            var updatedPosts = _this.posts.filter(function (post) { return post.id !== postId; });
            _this.posts = updatedPosts;
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    PostsService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], PostsService);
    return PostsService;
}());
exports.PostsService = PostsService;
