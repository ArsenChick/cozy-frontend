"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = exports.VideoInfo = void 0;
var VideoInfo = /** @class */ (function () {
    function VideoInfo() {
        this.qualities = new Map();
        this.name = "";
    }
    VideoInfo.Clone = function (data) {
        var vidInfo = new VideoInfo();
        vidInfo.name = data.name;
        vidInfo.author = data.author;
        vidInfo.qualities = new Map(Object.entries(data.qualities));
        return vidInfo;
    };
    return VideoInfo;
}());
exports.VideoInfo = VideoInfo;
var Helper = /** @class */ (function () {
    function Helper() {
        this.galleryVideos = [
            {
                name: 'Mi-mi-mi <3',
                length: 20,
                video: 'anNkCufW1_'
            },
            {
                name: 'Pro gaming',
                length: 22,
                video: 'pbeuKzUUuF'
            },
        ];
        var videoQualities1 = new Map();
        videoQualities1.set('240', [
            {
                codec: 'video/webm',
                link: 'anNkCufW1_240.webm'
            },
            {
                codec: 'video/mp4',
                link: 'anNkCufW1_240.mp4'
            }
        ]);
        videoQualities1.set('360', [
            {
                codec: 'video/webm',
                link: 'anNkCufW1_360.webm'
            },
            {
                codec: 'video/mp4',
                link: 'anNkCufW1_360.mp4'
            }
        ]);
        var videoQualities2 = new Map();
        videoQualities2.set('240', [
            {
                codec: 'video/webm',
                link: 'pbeuKzUUuF240.webm'
            },
            {
                codec: 'video/mp4',
                link: 'pbeuKzUUuF240.mp4'
            }
        ]);
        videoQualities2.set('360', [
            {
                codec: 'video/webm',
                link: 'pbeuKzUUuF360.webm'
            },
            {
                codec: 'video/mp4',
                link: 'pbeuKzUUuF360.mp4'
            }
        ]);
        videoQualities2.set('480', [
            {
                codec: 'video/webm',
                link: 'pbeuKzUUuF480.webm'
            },
            {
                codec: 'video/mp4',
                link: 'pbeuKzUUuF480.mp4'
            }
        ]);
        videoQualities2.set('720', [
            {
                codec: 'video/webm',
                link: 'pbeuKzUUuF720.webm'
            },
            {
                codec: 'video/mp4',
                link: 'pbeuKzUUuF720.mp4'
            }
        ]);
        var videoInfo1 = {
            qualities: videoQualities1,
            name: 'Mi-mi-mi <3',
            author: 'papich'
        };
        var videoInfo2 = {
            qualities: videoQualities2,
            name: 'Pro gaming',
            author: 'papich'
        };
        this.videos = new Map();
        this.videos.set('anNkCufW1_', videoInfo1);
        this.videos.set('pbeuKzUUuF', videoInfo2);
    }
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=videos.js.map