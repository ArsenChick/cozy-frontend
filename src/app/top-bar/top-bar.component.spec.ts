import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

import { TopBarComponent } from './top-bar.component';
import { GalleryComponent } from '../gallery/gallery.component'
import { UploadComponent } from '../upload/upload.component'

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: GalleryComponent },
          { path: 'upload', component: UploadComponent },
        ])
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(TopBarComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    });;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to upload page', () => {
    const uploadEl = fixture.debugElement.query(By.css('.fancy-button'));
    const routerLinkInstance = uploadEl.injector.get(RouterLinkWithHref);
    expect(routerLinkInstance['commands']).toEqual(['/upload']);
    expect(routerLinkInstance['href']).toEqual('/upload');
  });

  it('should have a link to home page', () => {
    const homeEl = fixture.debugElement.query(By.css('a'));
    const routerLinkInstance = homeEl.injector.get(RouterLinkWithHref);
    expect(routerLinkInstance['commands']).toEqual(['/']);
    expect(routerLinkInstance['href']).toEqual('/');
  });
});
