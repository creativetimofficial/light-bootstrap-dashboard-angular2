import { Component, OnInit } from '@angular/core';
import { Blog } from 'app/blogslist/blogslist.component';
import { BlogService } from 'app/Services/BlogService';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogPosts = [
  ];
  apiBaseUrl = environment.baseUrl;
  constructor(private blogService: BlogService) {
   }
  loadBlogs() {
  this.blogService.getAllBlogs().subscribe({
    next: blogs => {
      this.blogPosts = blogs.map(blog => ({
        ...blog,
        liked: false 
      }));
    },
    error: err => console.error(err)
  });
}
  ngOnInit() {
    this.loadBlogs()
  }
  getImageUrl(imagePath: string): string {
    return this.apiBaseUrl + imagePath;
  }
  onLike(blog: Blog, index: number): void {
    this.blogService.incrementLike(blog.id).subscribe({
      next: (res) => {
        this.blogPosts[index].likes = res.likes;
        this.blogPosts[index].liked = true;
      },
      error: (err) => console.error('Erreur lors du like :', err)
    });
  }
  transformNewlines(text: string): string {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}
}
