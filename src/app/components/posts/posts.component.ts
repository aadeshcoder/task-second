import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Post';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  addPostEventSubscription: Subscription;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.addPostEventSubscription = this.dataService.getAddPostEvent().subscribe((post) => this.addPostData(post));
  }

  showLoader = false;

  posts: Post[] = [];

  ngOnInit(): void {
    this.getPostsData();
    this.showLoader = true;
  }

  // add post function here
  addPost() {
    console.log("Adding Task");
    this.dialog.open(AddPostComponent, {
      height: '405px',
      width: '600px',
    })
  }

  getPostsData() {
    this.showLoader = true;
    this.dataService.getPostsData().subscribe((data) => { this.posts = data; this.showLoader = false; });
  }

  addPostData(post: Post) {
    this.dataService.addPost(post).subscribe((post) => this.posts.push(post))
  }

}
