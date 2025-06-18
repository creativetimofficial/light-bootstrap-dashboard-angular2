import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
export interface Blog {
  id: number;
  titre: string;
  contenu: string;
  image: string;        
  tags: string[];       
  likes: number;        
}
@Component({
  selector: 'app-blogslist',
  templateUrl: './blogslist.component.html',
  styleUrls: ['./blogslist.component.scss']
})
export class BlogslistComponent implements OnInit {
constructor(private router: Router) { }

 blogs: Blog[] = [];

  ngOnInit() {
    this.blogs = [
      {
        id: 1,
        titre: 'Premier blog',
        contenu: 'Contenu du premier blog...',
        image: '/assets/img/gallery-img-03.jpg',
        tags: ['tech', 'innovation'],
        likes: 5
      },
      {
        id: 2,
        titre: 'Blog 2',
        contenu: 'Contenu du blog 2...',
        image: '/assets/img/gallery-img-03.jpg',
        tags: ['coding', 'angular'],
        likes: 10
      }
    ];
  }

  editBlog(id: number) {
    this.router.navigate(['/update-blog', id]);
    console.log("Edit blog", id);
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: 'Supprimer ce blog ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogs = this.blogs.filter(b => b.id !== id);
        Swal.fire('Supprimé !', 'Le blog a été supprimé.', 'success');
      }
    });
  }

}
