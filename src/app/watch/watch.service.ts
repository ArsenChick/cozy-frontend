import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface VideoLink {
  codec: string;
  link: string;
}

export class VideoInfo {
  qualities: Map<string, VideoLink[]> = new Map();
  name: string = "";
  author: string | undefined;

  static Clone(data: VideoInfo) {
    const vidInfo = new VideoInfo();
    vidInfo.name = data.name;
    vidInfo.author = data.author;
    vidInfo.qualities = new Map(Object.entries(data.qualities));
    return vidInfo;
  }
}

@Injectable()
export class WatchService{

  watchVideosUrl = 'http://localhost:3000/?video=';

  constructor(private http: HttpClient) { }

  getVideos(videoID: string) {
    const videoUrl = this.watchVideosUrl + videoID;
    return this.http.get<VideoInfo>(videoUrl)
    .pipe(
      map(data => VideoInfo.Clone(data)),
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
