// import { TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';
// import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
// import { WordpressService } from './wordpress.service';
// import { PostsListComponent } from '../../components/content/posts-list/posts-list.component';
// import {  RouterTestingModule } from '@angular/router/testing';

// describe('WordpressService', () => {
//   let serviceTest: WordpressService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientModule,
//                  RouterTestingModule
//                ],
//       providers: [WordpressService]
//     });
//     serviceTest = TestBed.get(WordpressService);
//   });

//  it('should have a service instance', () => {
//     expect(serviceTest).toBeDefined();
//   });

//   it('should handle a simple async scenario with the posts', async(() => {
//     serviceTest.getPosts().subscribe((blogs: any[]) => {
//       expect(blogs.length).toBe(10);
//       expect(blogs[0].id).toBe(74);
//     });
//   }));

//   it('should be created', inject([WordpressService], (service: WordpressService) => {
//     expect(service).toBeTruthy();
//   }));
// });
