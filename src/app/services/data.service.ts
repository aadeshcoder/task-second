import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// sell data
import { SellData } from 'src/app/SellData';
import { sellsData } from 'src/app/mock-data';

// emp data 
import { empData } from "src/app/employee-mock-data";
import { EmployeeData } from 'src/app/EmployeeData';

// posts data
import { Post } from '../Post';
import { posts } from '../posts-mock-data';


const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<any>();

  constructor(private http:HttpClient) { }

  postUrl = "http://localhost:5000/posts";

  getSellData ():Observable<SellData[]> {
    const sellData = of(sellsData);
    return sellData;
  }

  getEmployeeData ():Observable<EmployeeData[]> {
    return of(empData);
  }

  getPostsData():Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  addPost(post:Post):Observable<Post> {
    return this.http.post<Post>(this.postUrl, post, httpOptions);
  }

  sendAddPostEvent(value:any) {
    this.subject.next(value);
  }

  getAddPostEvent () {
    return this.subject.asObservable();
  }
}
