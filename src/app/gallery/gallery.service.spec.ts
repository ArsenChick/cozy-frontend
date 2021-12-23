import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GalleryVideo, GalleryService } from './gallery.service';
import { TestHelper } from '../test-helper';

describe('GalleryService', () => {
  let service: GalleryService;
  let httpTestingController: HttpTestingController;
  let testHelper = new TestHelper();

  const galleryVideosUrl = 'http://localhost:3000';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GalleryService]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GalleryService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return videos', () => {
    service.getVideos()
      .subscribe(data => {
        expect(data).toEqual(testHelper.galleryVideos);
      });

    const req = httpTestingController.expectOne(galleryVideosUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(testHelper.galleryJson);
  });
});
