"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
// import { Component, Input, OnInit } from '@angular/core';
var core_1 = require("@angular/core");
var PostListComponent = /** @class */ (function () {
    function PostListComponent(postsService) {
        this.postsService = postsService;
        // posts = [
        //   { title: 'First Post', content: 'This is the first post\'s content'},
        //   { title: 'Second Post', content: 'This is the second post\'s content'},
        //   { title: 'Third Post', content: 'This is the third post\'s content'}
        // ];
        this.posts = [];
        this.isLoading = false;
    }
    PostListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe(function (posts) {
            _this.isLoading = false;
            _this.posts = posts;
        });
    };
    PostListComponent.prototype.onDelete = function (postId) {
        this.postsService.deletePost(postId);
    };
    PostListComponent.prototype.ngOnDestroy = function () {
        this.postsSub.unsubscribe();
    };
    PostListComponent = __decorate([
        core_1.Component({
            selector: 'app-post-list',
            templateUrl: './post-list.component.html',
            styleUrls: ['./post-list.component.css']
        })
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
