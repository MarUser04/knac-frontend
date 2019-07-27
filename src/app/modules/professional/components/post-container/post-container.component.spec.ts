// import { async, fakeAsync, inject, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
// import {  RouterTestingModule } from '@angular/router/testing';
// import { PostViewComponent } from './post-view.component';
// import { PostsListComponent } from '../posts-list/posts-list.component';
// import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// import { WordpressService } from '../../../services/wordpress/wordpress.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import {ResponseOptions} from '@angular/http';
// import {MockBackend, MockConnection} from '@angular/http/testing';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { environment as env } from '../../../../environments/environment';
// import {SharedModule} from '../../../shared/shared.module';

// import {
//   Headers, BaseRequestOptions,
//   Response, Http, XHRBackend, RequestMethod
// } from '@angular/http';


// describe('PostViewComponent', () => {
//   let component: PostViewComponent;
//   let fixture: ComponentFixture<PostViewComponent>;
//   let mockBackend: MockBackend;
//   const id = 7;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [SharedModule, LoadingBarHttpClientModule, RouterTestingModule, HttpClientTestingModule, HttpClientModule ],
//       providers: [ WordpressService ]

//     })
//     .compileComponents();
//   }));

//   it('should created the service', inject([HttpClient, HttpTestingController, WordpressService], (http: HttpClient,
//     backend: HttpTestingController, service: WordpressService) => {
//       expect(service).toBeTruthy();
//   }));

//   describe('#getOnePost', () => {
//       it(`should issue a request`,
//         async(
//           inject([HttpClient, HttpTestingController, WordpressService], (http: HttpClient, backend: HttpTestingController,
//           service: WordpressService) => {
//             http.get(env.wordpressURL + '/post/' + id + '?_embed').subscribe();
//             backend.expectOne({
//               url: env.wordpressURL + '/post/' + id + '?_embed',
//               method: 'GET'
//             });
//           })
//         )
//       );
//   });

// });
