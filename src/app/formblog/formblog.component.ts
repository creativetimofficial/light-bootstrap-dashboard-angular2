import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCreateRequest, BlogService, BlogUpdateRequest } from 'app/Services/BlogService';
import { Blog } from 'app/blogslist/blogslist.component';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';

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
    imagePath: '',
    tags: [],
    likes: 0
  };
  storedUser = this.cookieService.get('userId');
 userId = this.storedUser ? Number(this.storedUser) : null;
  selectedFile?: File;
  newTag: string = '';
  isEditMode = false;
  isDragging = false;
  apiBaseUrl = environment.baseUrl;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,private cookieService: CookieService
  ) {}

  ngOnInit() {
    
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.isEditMode = true;
      this.blogService.getBlogById(+blogId).subscribe({
        next: data => {
          this.blog = {...data,
            tags: data.tags.map((t: any) => t.nom || t) 
          
        }
      },
        error: err => console.error('Erreur chargement blog')
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && this.selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => this.blog.imagePath = (e.target as FileReader).result as string;
      reader.readAsDataURL(this.selectedFile);
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
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.blog.imagePath = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  addTag(event: KeyboardEvent) {
    event.preventDefault();
    const tag = this.newTag.trim();
    const tagExists = this.blog.tags.includes(tag);
    if (tag && !tagExists) {
      this.blog.tags.push(tag);
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    this.blog.tags.splice(index, 1);
  }

  onSubmit() {
    const CreateRequest: BlogCreateRequest = {
      titre: this.blog.titre,
      contenu: this.blog.contenu,
      userId: this.userId, 
      tags: this.blog.tags, 
      image: this.selectedFile || undefined
    };
    const UpdateRequest: BlogUpdateRequest = {
      titre: this.blog.titre,
      contenu: this.blog.contenu,
      tags: this.blog.tags, 
      newImage: this.selectedFile || undefined
    };
   
    if (this.isEditMode) {
      this.blogService.updateBlog(this.blog.id, UpdateRequest).subscribe({
        next: () => this.router.navigate(['/listblogs']),
        error: (err) => {
          console.error('Erreur update blog:', err);
          if (err.error instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => console.error('Erreur backend JSON:', reader.result);
            reader.readAsText(err.error);
          } else {
            console.error('Erreur directe:', err.error);
          }
        }
      });
    } else {
      this.blogService.createBlog(CreateRequest).subscribe({
        next: () => this.router.navigate(['/listblogs']),
        error: (err) => {
          console.error('Erreur création blog:', err);
          if (err.error instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => console.error('Erreur backend:', reader.result);
            reader.readAsText(err.error);
          } 
        }
      });
    }
  }

  getImageUrl(imagePath: string): string {
    return this.apiBaseUrl + imagePath;
  }

}
