import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  constructor(private fb: FormBuilder) { }

  addPostForm = this.fb.group({
    name: ['', Validators.required],
    title: ['', Validators.required],
    message: ['', Validators.required]
  });

  onSubmit() {
    console.log(this.addPostForm.value);
  }
}
