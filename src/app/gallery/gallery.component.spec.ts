import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

import { GalleryComponent } from './gallery.component';
import { WatchComponent } from '../watch/watch.component';
import { GalleryService } from './gallery.service';
import { TestHelper } from '../test-helper';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let getVideosSpy: jasmine.Spy;

  let testHelper = new TestHelper();

  beforeEach(waitForAsync(() => {
    const galleryServiceSpy = jasmine.createSpyObj('GalleryService', ['getVideos']);
    getVideosSpy = galleryServiceSpy.getVideos;

    TestBed.configureTestingModule({
      declarations: [ GalleryComponent ],
      imports: [ RouterTestingModule.withRoutes([{
        path: 'watch/:videoId', component: WatchComponent
      }]) ],
      providers: [ { provide: GalleryService, useValue: galleryServiceSpy }, ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;

    const obs$ = cold('-x|', { x: testHelper.galleryVideos });
    getVideosSpy.and.returnValue(obs$);

    fixture.detectChanges();
    getTestScheduler().flush();
  });

  it('should create and get its videos field defined', () => {
    expect(component).toBeTruthy();
    expect(component.videos).toEqual(testHelper.galleryVideos);
  });

  it('should have a link to watch page', () => {
    fixture.detectChanges();
    const linkEl = fixture.debugElement.query(By.css('a'));
    const routerLinkInstance = linkEl.injector.get(RouterLinkWithHref);

    expect(routerLinkInstance['commands']).toEqual(['/watch', testHelper.testID]);
    expect(routerLinkInstance['href']).toEqual('/watch/' + testHelper.testID);
  });
});
