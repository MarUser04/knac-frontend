import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostsContainerComponent } from '@app/modules/home/components/posts-container/posts-container.component';
import { PostContainerComponent } from '@app/modules/home/components/post-container/post-container.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'posts', component: PostsContainerComponent },
      { path: 'post/:id', component: PostContainerComponent }
    ]
  }
];
