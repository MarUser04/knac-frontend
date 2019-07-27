// import { async, fakeAsync, tick, inject, ComponentFixture, TestBed } from '@angular/core/testing';
// import {  RouterTestingModule } from '@angular/router/testing';
// import { PostsListComponent } from './posts-list.component';
// import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// import { WordpressService } from '../../../services/wordpress/wordpress.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ActivatedRoute, Data } from '@angular/router';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { environment as env } from '../../../../environments/environment';
// import {SharedModule} from '../../../shared/shared.module';

// describe('WordpressService', () => {
//   let service: WordpressService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [ SharedModule, LoadingBarHttpClientModule, RouterTestingModule, HttpClientTestingModule, HttpClientModule ],
//       providers: [ WordpressService ]

//     });
//     service = TestBed.get(WordpressService);
//   });

//   describe('#getAllPosts()', () => {
//     it('should retrieve posts from the Wordpress API via GET', () => {
//         service.getPosts().subscribe(posts => {
//           expect(posts.length).toBe(7);
//         });
//     });
//   });
// });
