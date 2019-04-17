import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.sass']
})

export class PostCreateComponent {
  enteredValue = '';
  newPost = '';

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
