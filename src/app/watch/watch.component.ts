import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WatchService, Video2 } from './watch.service';
import { Video, videos } from '../videos';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit {

  video: Video | undefined;

  constructor(
    private route: ActivatedRoute,
    private watchService: WatchService
    ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const videoIdFromRoute = String(routeParams.get('videoId'));
    this.video = videos.find((video) => video.id === videoIdFromRoute);
    this.watchService.ngOnInit();
  }
}
