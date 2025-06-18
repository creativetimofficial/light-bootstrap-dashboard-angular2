import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'app/blogslist/blogslist.component';

@Component({
  selector: 'app-formblog',
  templateUrl: './formblog.component.html',
  styleUrls: ['./formblog.component.scss']
})
export class FormblogComponent implements OnInit {

 blog: Blog = {
    id: 0,
    titre: '',
    contenu: '',
    image: '',
    tags: [],
    likes: 0
  };

  newTag: string = '';
  isEditMode = false;
  isDragging = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.isEditMode = true;

      const storedBlog = null;
      if (storedBlog) {
        this.blog = storedBlog;
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => this.blog.image = (e.target as FileReader).result as string;
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.blog.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addTag(event: KeyboardEvent) {
    event.preventDefault();
    if (this.newTag.trim() && !this.blog.tags.includes(this.newTag.trim())) {
      this.blog.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    this.blog.tags.splice(index, 1);
  }

  onSubmit() {
    if (this.isEditMode) {
      // blogService.update(this.blog);
    } else {
      // blogService.create(this.blog);
    }
    this.router.navigate(['listblogs']);
  }
}
