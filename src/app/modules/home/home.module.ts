import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostsContainerComponent } from '@app/modules/home/components/posts-container/posts-container.component';
import { PostContainerComponent } from '@app/modules/home/components/post-container/post-container.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [
    HomeComponent,
    AboutComponent,
    PostsContainerComponent,
    PostContainerComponent
  ]
})
export class HomeModule {}
