import { PostsService } from './../posts.service';
import { Post } from '../post.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.sass']
})

export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  post: Post;
  private mode = 'create';
  private postId: string;

  constructor(private fb: FormBuilder, public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: '',
      content: ''
    });

    this.postForm.valueChanges.subscribe();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
        this.postForm.get('title').setValue(this.post.title);
        this.postForm.get('content').setValue(this.post.content);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(postForm: FormGroup) {
    if (postForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(postForm.value.title, postForm.value.content);
    } else {
      this.postsService.updatePost(this.postId, postForm.value.title, postForm.value.content)
    }
    postForm.reset();
  }
}
