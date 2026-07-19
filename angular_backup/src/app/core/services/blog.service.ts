import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  Id: string;
  Name: string;
  UrlHandle: string;
}

export interface BlogPost {
  Id: string;
  Tittle: string;
  ShortDescription: string;
  Content: string;
  FeaturedImageUrl: string;
  UrlHandle: string;
  PublishedDate: string;
  Author: string;
  Categories: Category[];
}
export interface ApiResponse<T> {
  Success: boolean;
  Message: string;
  Data: T;
  StatusCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private http = inject(HttpClient);

  private apiUrl =
    'https://skms-api.onrender.com/api/BlogPost/latest?count=6';

  getLatestBlogs(): Observable<ApiResponse<BlogPost[]>> {

    return this.http.get<ApiResponse<BlogPost[]>>(this.apiUrl);

  }

}