import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';

import { Blog } from '@app/modules/professional/models/blog';

@Component({
  selector: 'pc-post',
  template: `
    <main class="content">
      <div *ngIf="post" class="boxCont topPost" id="topPost">
        <div class="leftBox">
          <article class="post single">
            <div class="back">
              <a [routerLink]="[router]">
                <i
                  class="fa fa-arrow-left return-icon"
                  title="Return posts list"
                ></i>
              </a>
              <span class="post__meta">
                <time
                  datetime="2017-04-23T00:00:00+00:00"
                  itemprop="datePublished"
                >
                  Posted on {{ post?.date | date }}
                </time>
              </span>
            </div>
            <header class="post__header">
              <h1 class="alpha post__title" itemprop="name headline">
                {{ post?.title?.rendered }}
              </h1>
              <div class="by">
                Written by {{ (post?._embedded?.author)[0]?.name }}
              </div>
              <div flex>
                <img
                  src="{{
                    post._embedded['wp:featuredmedia'] != null
                      ? post._embedded['wp:featuredmedia'][0].source_url
                      : imagenDefault
                  }}"
                  class="post-image"
                />
              </div>
            </header>
            <section
              class="content-post listener"
              style="
              color: #4f4f4f;
              font-family: Lato;
              font-size: 16px;
              line-height: 19px;
            "
            >
              <p
                [innerHTML]="post?.content?.rendered"
                class="texto-post-content"
              ></p>
            </section>
            <div style="text-align:end;">
              <a (click)="scroll()" style="margin:none;" class="gotop"
                >Go to top</a
              >
            </div>
          </article>
        </div>
        <div class="rightBox">
          <div class="titleR">
            recent posts
          </div>
          <div class="contentR" *ngFor="let item of recentPosts">
            <a
              [routerLink]="[routerId + item?.id]"
              (click)="changesId(item?.id)"
              >{{ item?.title?.rendered }}</a
            >
          </div>
        </div>
      </div>
    </main>
  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post: Blog;
  @Input() router: string;
  @Input() routerId: string;
  @Input() posts: Blog[];
  recentPosts: Blog[];
  imagenDefault = '/assets/images/user_placeholder.png';

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.posts) {
      this.recentPosts = this.posts.slice(0, 3);
      let index = null;
      const length = this.recentPosts.length;
      const auxPots = this.recentPosts.filter((post, i) => {
        if (this.post.title.rendered === post.title.rendered) {
          index = i;
          return post;
        }
      });
      if (auxPots.length > 0) {
        this.recentPosts.splice(index, 1);
        if (this.recentPosts.length < this.posts.length) {
          this.recentPosts.push(this.posts[length]);
        }
      }
    }
  }

  scroll() {
    let top = document.getElementById('topPost');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  changesId(id) {
    this.recentPosts = [];
    this.change.emit(id);
  }
}
