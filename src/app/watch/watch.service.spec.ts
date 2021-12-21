import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { VideoInfo, WatchService } from './watch.service';
import { TestHelper } from '../test-helper';

describe('WatchService', () => {
  let service: WatchService;
  let httpTestingController: HttpTestingController;
  let testHelper = new TestHelper();

  const watchVideosUrl = 'http://localhost:3000/?video=';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WatchService]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WatchService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return video info', () => {
    service.getVideos(testHelper.testID)
      .subscribe(data => {
        expect(data).toBeInstanceOf(VideoInfo);
        expect(data).toEqual(testHelper.singleVideo)
      });

    const req = httpTestingController.expectOne(watchVideosUrl + testHelper.testID);
    expect(req.request.method).toEqual('GET');

    req.flush(testHelper.watchJson);
  });
});
