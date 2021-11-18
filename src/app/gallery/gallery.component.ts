import { Component } from '@angular/core';

import { videos } from '../videos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  videos = videos;
}
