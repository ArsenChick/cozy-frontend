import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { WatchComponent } from './watch/watch.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: GalleryComponent },
    { path: 'watch/:videoId', component: WatchComponent },
    { path: 'upload', component: UploadComponent },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
