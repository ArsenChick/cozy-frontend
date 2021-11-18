import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  uploadForm = this.formBuilder.group({
    title: '',
    videolink: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  onSubmit(): void {
    console.warn('Your video has been uploaded', this.uploadForm.value);
  }
}