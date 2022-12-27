import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  constructor(private fb: FormBuilder, private dataService:DataService) { }

  // restrictedUser = new FormControl('');
  usersList: string[] = ["Dilip", "Sameer", "Priyanka", "Rahul", "Rajesh", "Anuraj", "Omkar"];

  addPostForm = this.fb.group({
    name: ['', Validators.required],
    title: ['', Validators.required],
    // restrictedUser: [''],
    message: ['', Validators.required],
  });

  onChange(evnet: any) {
    console.log(event);
  }


  onSubmit() {
    console.log(this.addPostForm.value);
    let time = new Date();
    let postedOn = time.toLocaleDateString();
    let newPost = {
      name:this.addPostForm.value.name,
      title:this.addPostForm.value.title,
      message:this.addPostForm.value.message,
      postedOn:postedOn,
    }
    this.dataService.sendAddPostEvent(newPost);
  }
}
