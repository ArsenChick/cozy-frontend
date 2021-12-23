import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { WatchComponent } from './watch.component';
import { WatchService } from './watch.service';
import { TestHelper } from '../test-helper';

describe('WatchComponent', () => {
  let component: WatchComponent;
  let fixture: ComponentFixture<WatchComponent>;
  let getVideosSpy: jasmine.Spy;
  let route: ActivatedRoute;

  let testHelper = new TestHelper();

  beforeEach(waitForAsync(() => {
    const watchServiceSpy = jasmine.createSpyObj('WatchService', ['getVideos']);
    getVideosSpy = watchServiceSpy.getVideos;

    TestBed.configureTestingModule({
      declarations: [ WatchComponent ],
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ { provide: WatchService, useValue: watchServiceSpy }, ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue(testHelper.testID);

    fixture = TestBed.createComponent(WatchComponent);
    component = fixture.componentInstance;

    const obs$ = cold('-x|', { x: testHelper.singleVideo });
    getVideosSpy.and.returnValue(obs$);

    fixture.detectChanges();
    getTestScheduler().flush();
  });

  it('should create and get its video field defined', () => {
    expect(component).toBeTruthy();
    expect(component.video).toEqual(testHelper.singleVideo);
  });

  it('should show and hide videos on button clicks', fakeAsync(() => {
    fixture.detectChanges();
    const vid = `${component.videoPath}${testHelper.testID}`;

    expect(component.selectedQuality).toEqual('240');
    expect(fixture.debugElement.query(By.css(`video[src="${vid}240.mp4"]`))).toBeDefined();
    expect(fixture.debugElement.query(By.css(`video[src="${vid}360.mp4"]`))).toBeNull();

    const buttonEl = fixture.nativeElement.querySelector('button[name="360"]');
    buttonEl.click();
    tick();

    expect(component.selectedQuality).toEqual('360');
    expect(fixture.debugElement.query(By.css(`video[src="${vid}360.mp4"]`))).toBeDefined();
    expect(fixture.debugElement.query(By.css(`video[src="${vid}240.mp4"]`))).toBeNull();
  }));
});
