import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Post';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  constructor (private dataService:DataService, public dialog:MatDialog) {}

  posts:Post[] = [];

  ngOnInit(): void {
    this.getPostsData();
  }

  // add post function here
  addPost() {
    console.log("Adding Task");
    this.dialog.open(AddPostComponent, {
      height:'405px',
      width:'600px',
    })
  }

  getPostsData() {
    this.dataService.getPostsData().subscribe((data) => this.posts = data);
  }

}
