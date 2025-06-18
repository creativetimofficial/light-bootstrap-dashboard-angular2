import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogPosts = [
    {
      author: 'Russ Beye',
      title: 'I Like To Make Cool Things',
      summary: `I love working on fresh designs that breathe. To that end, I need to freshen up my portfolio...`,
      tags: ['css', 'web design', 'codepen', 'twitter'],
      publishedDate: '12/01/2025',
      comments: 4,
      shares: 1,
      likes: 0 ,
      liked:false,
      coverImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/yosemite-3.jpg'
    },
    {
      author: 'Russ Beye',
      title: 'This Post Has No Cover Image',
      summary: `Here is an example of a post without a cover image. You don't always have to have a cover image.`,
      tags: ['design', 'web dev', 'css'],
      publishedDate: '16/06/2025',
      comments: 8,
      liked:false,
      shares: 3,likes: 10 
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
 toggleLike(index: number): void {
    const blog = this.blogPosts[index];
    blog.liked = !blog.liked;
    blog.likes += blog.liked ? 1 : -1;
  }
}
