"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var material_1 = require("@angular/material");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var post_create_component_1 = require("./posts/post-create/post-create.component");
var post_list_component_1 = require("./posts/post-list/post-list.component");
var app_routing_module_1 = require("./app-routing.module");
var login_component_1 = require("./auth/login/login.component");
var signup_component_1 = require("./auth/signup/signup.component");
// import { PostsService } from './posts/posts.service';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                post_create_component_1.PostCreateComponent,
                post_list_component_1.PostListComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatInputModule,
                material_1.MatCardModule,
                material_1.MatButtonModule,
                material_1.MatToolbarModule,
                material_1.MatExpansionModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatPaginatorModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
