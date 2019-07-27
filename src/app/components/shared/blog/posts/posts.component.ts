import { Component, OnInit, Input } from '@angular/core';

import { Blog } from '@app/modules/professional/models/blog';
import { environment as env } from '@app/../environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'pc-posts',
  template: `
    <div class="container-post">
      <!--<h1 class="title-placeholder">Welcome to Knac!</h1>
      <p class="content-placeholder">
        Knac is here to help you take power back in your job search.<br /><br />
        We know how frustrating it is to apply for jobs and not know what you’re
        doing right… or what you’re doing wrong. We designed the first platform
        to give you feedback on your skills so you can grow in your career.<br /><br />
        Bye bye canned rejection emails! <br /><br />
        By taking assessments you’ll be able to showcase your skills to
        employers for the first time and build a portfolio of cool work.
        Companies post assessments for you to complete that provide direct
        insight into your abilities. More importantly, you’ll actually get real
        feedback on things you can improve on even if you're not chosen for the
        job.<br /><br />
        Knac is now in beta and we will be making lots of updates as we go! Over
        the next few weeks, great companies such as Google, Nike, Mastercard,
        eBay, Oscar Health, Vimeo, and a few others will be posting their jobs
        and assessments on Knac.<br /><br />
        Check back every week to see what’s new and start showing these
        companies why they need you.<br /><br />
        You are more than a resume!<br /><br />
        <span>The Knac team<br /><br /></span>
      </p>-->
      <div *ngFor="let post of pageOfItems">
        <mat-card class="card-post" layout-align="center">
          <mat-card-content class="subBox" fxLayout="row" fxLayout.xs="column">
            <div flex>
              <img
                routerLink="{{ router }}{{ post.id }}"
                src="{{
                  post._embedded['wp:featuredmedia'] != null
                    ? post._embedded['wp:featuredmedia'][0].source_url
                    : imagenDefault
                }}"
                class="post-image"
              />
            </div>
            <div flex class="container-data-post">
              <!--<h3 class="mat-h1">{{ post.title.rendered }}</h3>-->
              <span>
                <time
                  style="font-family: Lato;
                  font-size: 11px;
                  font-weight: bold;
                  color: #4f4f4f;"
                  datetime="2017-04-23T00:00:00+00:00"
                  itemprop="datePublished"
                >
                  Posted on {{ post?.date | date }}
                </time>
              </span>

              <div class="texto-post mat-body-1">
                <br />
                <span
                  class="title-post"
                  style="
                        color: #000;
                        font-family: Lato;
                        font-size: 32px;
                        font-weight: bold;
                        line-height: 39px;"
                >
                  {{ post.title.rendered }}
                </span>
                <br /><br />
                <mat-card-content
                  class = "content-post-posts"
                  [innerHTML]="post?.excerpt?.rendered"
                ></mat-card-content>
                <a routerLink="{{ router }}{{ post.id }}" class="more-link">
                  Continue reading
                </a>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      <div class="continer-pagination">
        <jw-pagination
          [items]="posts"
          (changePage)="onChangePage($event)"
        ></jw-pagination>
      </div>
    </div>
  `,
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts: Blog[];
  @Input() router: string;
  pageOfItems: Blog[];
  imagenDefault = '/assets/images/user_placeholder.png';
  length = 0;
  pageSize = 5;
  env = env;

  data: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  loadHtml(res) {
    this.data = this.sanitizer.bypassSecurityTrustHtml(res);
  }

  onChangePage(pageOfItems: Blog[]) {
    this.pageOfItems = pageOfItems;
  }
}
