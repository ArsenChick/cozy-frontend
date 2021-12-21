import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { UploadComponent } from './upload.component';
import { TestHelper } from '../test-helper';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let httpTestingController: HttpTestingController;

  let testHelper = new TestHelper();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      providers: [ FormBuilder, Validators ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get field when attaching file', () => {
    const fileUploadEl = fixture.debugElement.query(By.css('.file-input'));
    fileUploadEl.triggerEventHandler('change', testHelper.mockFileTarget);

    fixture.detectChanges();
    expect(component.fileToUpload)
      .toEqual(testHelper.mockFileTarget.target.files[0].name);
  });

  it('should have two required fields', () => {
    const requiredInputEl = fixture.nativeElement.querySelectorAll('input[required]');
    expect(requiredInputEl.length).toEqual(2);

    const fileFormGroupField = component.uploadForm.get('videofile');
    expect(fileFormGroupField?.errors?.['required']).toBeTruthy();
    const titleFormGroupField = component.uploadForm.get('title');
    expect(titleFormGroupField?.errors?.['required']).toBeTruthy();
  });

  it('should show messages on no title input', fakeAsync(() => {
    const inputEl = fixture.debugElement.query(By.css('input[formcontrolname="title"]'));
    inputEl.nativeElement.value = "";
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    tick();

    expect(fixture.nativeElement.querySelector('input[formcontrolname="title"]+.valid-error'))
      .toBeDefined();
  }));

  it('should show messages on no file input', fakeAsync(() => {
    const fileUploadEl = fixture.debugElement.query(By.css('.file-input'));
    fileUploadEl.triggerEventHandler('focus', { target: fileUploadEl.nativeElement });
    tick();

    expect(fixture.nativeElement.querySelector('button[type="button"]+.valid-error'))
      .toBeDefined();
  }));

  it('should make post request when form correct', fakeAsync(() => {
    const fileUploadEl = fixture.debugElement.query(By.css('.file-input'));
    fileUploadEl.triggerEventHandler('change', testHelper.mockFileTarget);

    const inputEl = fixture.debugElement.query(By.css('input[formcontrolname="title"]'));
    inputEl.nativeElement.value = "sometext";
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    tick();

    expect(component.uploadForm.get('videofile')?.value)
      .toEqual(testHelper.mockFileTarget.target.files[0]);
    expect(component.uploadForm.get('title')?.value).toEqual('sometext');

    const sumbitEl = fixture.nativeElement.querySelector('button[type="submit"]');
    sumbitEl.click();
    tick();

    const req = httpTestingController.expectOne(component.uploadUrl);
    expect(req.request.method).toEqual('POST');
  }));
});
