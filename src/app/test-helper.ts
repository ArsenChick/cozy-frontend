import { VideoLink, VideoInfo } from "./watch/watch.service";
import { GalleryVideo } from "./gallery/gallery.service";

export class TestHelper {
  watchJson = {"qualities":{"240":[{"codec":"video/webm","link":"anNkCufW1_240.webm"},{"codec":"video/mp4","link":"anNkCufW1_240.mp4"}],"360":[{"codec":"video/webm","link":"anNkCufW1_360.webm"},{"codec":"video/mp4","link":"anNkCufW1_360.mp4"}]},"author":"ares","name":"papeze"};
  galleryJson = [{"name":"papeze","length":14,"video":"anNkCufW1_"},{"name":"pap","length":280,"video":"pbeuKzUUuF"}];

  galleryVideos: GalleryVideo[] = [{ name:"papeze", length:14, video:"anNkCufW1_" },{ name:"pap", length:280, video:"pbeuKzUUuF" }];
  singleVideo: VideoInfo;

  mockFileTarget = { target: { files: [{ name: "hello.mp4"}] }};
  testID: string = 'anNkCufW1_';

  constructor() {
    var videoQualities = new Map<string, VideoLink[]>();
    var videoLink1 : VideoLink[] = [{ codec: 'video/webm', link: 'anNkCufW1_240.webm' }, { codec: 'video/mp4', link: 'anNkCufW1_240.mp4' }];
    var videoLink2 : VideoLink[] = [{ codec: 'video/webm', link: 'anNkCufW1_360.webm' }, { codec: 'video/mp4', link: 'anNkCufW1_360.mp4' }];

    videoQualities.set('240', videoLink1);
    videoQualities.set('360', videoLink2);

    var videoInfo = new VideoInfo();
    videoInfo.qualities = videoQualities;
    videoInfo.author = 'ares';
    videoInfo.name = 'papeze';
    this.singleVideo = videoInfo;
  }
}
