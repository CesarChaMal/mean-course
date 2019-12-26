import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: RouterModule = [
  { path: '', component: PostListComponent },
  { path: '', component: PostListComponent }
];


@NgModule({

})
export class AppRoutingModule {}





