import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WatchService, VideoInfo } from './watch.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit {

  video: VideoInfo | undefined;
  videoPath: string = "http://127.0.0.1:5500/video/"
  selectedQuality: any = '240';

  constructor(
    private route: ActivatedRoute,
    private watchService: WatchService
    ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const videoIdFromRoute = String(routeParams.get('videoId'));
    this.watchService.getVideos(videoIdFromRoute)
      .subscribe(
        (data: VideoInfo) => {
          this.video = data;
          console.log(this.video);
        }
      );
  }
}
