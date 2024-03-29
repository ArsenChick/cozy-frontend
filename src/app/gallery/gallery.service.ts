import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface GalleryVideo {
  name: string;
  length: number;
  video: string;
}

@Injectable()
export class GalleryService {

  galleryVideosUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getVideos() {
    return this.http.get<GalleryVideo[]>(this.galleryVideosUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() =>
      new Error('Something bad happened; please try again later.'));
  }
}
