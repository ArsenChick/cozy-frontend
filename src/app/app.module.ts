import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { WatchComponent } from './watch/watch.component';
import { UploadComponent } from './upload/upload.component';

import { GalleryService } from './gallery/gallery.service';
import { WatchService } from './watch/watch.service';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    TopBarComponent,
    WatchComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [GalleryService, WatchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
