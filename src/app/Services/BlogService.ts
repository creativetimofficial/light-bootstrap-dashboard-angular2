import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Blog } from 'app/blogslist/blogslist.component';

export interface BlogCreateRequest {
  titre: string;
  contenu: string;
  userId: number;
  tags: string[];
  image: File | null;
}

export interface BlogUpdateRequest {
  titre: string;
  contenu: string;
  newImage?: File;       
  tags: string[];        
}
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.apiUrl + '/blog';

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  createBlog(request: BlogCreateRequest): Observable<Blog> {
    const formData = new FormData();

    formData.append('Titre', request.titre);
    formData.append('Contenu', request.contenu);
    formData.append('UserId', request.userId.toString());
    request.tags.forEach(tag => formData.append('Tags', tag));

    if (request.image) {
      formData.append('Image', request.image, request.image.name);
    }

    return this.http.post<Blog>(this.apiUrl, formData);
  }
updateBlog(id: number, request: BlogUpdateRequest): Observable<any> {
        const formData = new FormData();
        formData.append('Titre', request.titre);
        formData.append('Contenu', request.contenu);

        if (request.newImage) {
            formData.append('NewImage', request.newImage, request.newImage.name);
        }

        request.tags.forEach(tag => {
            formData.append('Tags', tag); 
        });

        return this.http.put(`${this.apiUrl}/${id}`, formData);
}



getBlogById(id: number) {
  return this.http.get<Blog>(`${this.apiUrl}/${id}`);
}

deleteBlog(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
