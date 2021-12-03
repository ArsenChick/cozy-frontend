import { Component, OnInit } from '@angular/core';

import { GalleryService, GalleryVideo } from './gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  videos: GalleryVideo[] | undefined;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleryService.getVideos()
      .subscribe(
        (data: GalleryVideo[]) => {
          this.videos = data;
          console.log(this.videos);
        }
      );
  }
}
