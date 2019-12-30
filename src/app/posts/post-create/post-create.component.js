"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
// import { Component, EventEmitter, Output } from '@angular/core';
var core_1 = require("@angular/core");
// import { Post } from '../post.model';
var forms_1 = require("@angular/forms");
var mime_type_validator_1 = require("./mime-type.validator");
var PostCreateComponent = /** @class */ (function () {
    function PostCreateComponent(postsService, route) {
        this.postsService = postsService;
        this.route = route;
        this.enteredTitle = '';
        this.enteredContent = '';
        this.isLoading = false;
        this.mode = 'create';
    }
    PostCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Reactive forms
        // this.form = new FormGroup({
        //   'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
        //   'content': new FormControl(null, {validators: [Validators.required]}),
        //   'image': new FormControl(null, {validators: [Validators.required]})
        // });
        // Reactive forms
        this.form = new forms_1.FormGroup({
            'title': new forms_1.FormControl(null, { validators: [forms_1.Validators.required, forms_1.Validators.minLength(3)] }),
            'content': new forms_1.FormControl(null, { validators: [forms_1.Validators.required] }),
            'image': new forms_1.FormControl(null, { validators: [forms_1.Validators.required], asyncValidators: [mime_type_validator_1.mimeType] })
        });
        this.route.paramMap.subscribe(function (paramMap) {
            if (paramMap.has('postId')) {
                _this.mode = 'edit';
                _this.postId = paramMap.get('postId');
                _this.isLoading = true;
                _this.postsService.getPost(_this.postId).subscribe(function (postData) {
                    _this.isLoading = false;
                    _this.post = { id: postData.id, title: postData.title, content: postData.content, imagePath: postData.imagePath };
                    console.log(postData.imagePath);
                    console.log(_this.post.imagePath);
                    // Reactive Forms
                    _this.form.setValue({ title: _this.post.title, content: _this.post.content, image: _this.post.imagePath });
                    // Reactive Forms
                });
            }
            else {
                _this.mode = 'create';
                _this.postId = null;
            }
        });
    };
    PostCreateComponent.prototype.onImagePicked = function (event) {
        var _this = this;
        var file = event.target.files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        var reader = new FileReader();
        reader.onload = function () {
            _this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
        console.log(file);
        console.log(this.form);
    };
    // Angular Forms
    // onSavePost(form: NgForm) {
    // Reactive Forms
    PostCreateComponent.prototype.onSavePost = function () {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
        }
        else {
            this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
        }
        // this.form.reset
        this.form.reset();
    };
    PostCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-post-create',
            templateUrl: './post-create.component.html',
            styleUrls: ['./post-create.component.css']
        })
    ], PostCreateComponent);
    return PostCreateComponent;
}());
exports.PostCreateComponent = PostCreateComponent;
