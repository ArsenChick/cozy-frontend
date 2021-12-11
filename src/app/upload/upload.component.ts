import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  fileToUpload = '';
  uploadForm = this.formBuilder.group({
    title: '',
    author: '',
    videofile: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.uploadForm.patchValue({
        videofile: file
      });
      this.fileToUpload = file.name;
    }
  }

  onSubmit(): void {
    const formData = this.uploadForm.value;
    console.warn('Your video object is ready', formData);

    const formulario = new FormData();
    Object.keys(formData).forEach((key) => {
      formulario.append(key, formData[key]);
    });

    const upl = this.http.post("http://localhost:3000", formulario);
    upl.subscribe(error => {
      console.log(error);
    });
  }
}
