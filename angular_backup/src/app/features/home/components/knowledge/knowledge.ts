import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogService, BlogPost } from '../../../../core/services/blog.service';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-knowledge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './knowledge.html',
  styleUrls: ['./knowledge.scss'],
})
export class KnowledgeComponent implements OnInit {
  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);

  blogs: BlogPost[] = [];

  ngOnInit(): void {
    this.blogService.getLatestBlogs().subscribe({
      next: (response) => {
        console.log(response.Data[0]);

        this.blogs = response.Data;
        this.cdr.detectChanges();
        console.log(this.blogs);
        console.log(this.blogs[0]);
        console.log(this.blogs.length);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
