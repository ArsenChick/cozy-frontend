import { Component, OnInit } from '@angular/core';

import { GalleryService, GalleryVideo } from './gallery.service';

import { Helper } from '../videos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  videos: GalleryVideo[] | undefined;
  thumbsPath: string = "http://webphp.com/Cozy/thumb/";

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    const helper = new Helper();
    this.videos = helper.galleryVideos;
    /*
    this.galleryService.getVideos()
      .subscribe(
        (data: GalleryVideo[]) => {
          this.videos = data;
        }
      );
    */
  }
}
