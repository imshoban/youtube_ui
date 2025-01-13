import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadPreviewComponent } from './components/upload-preview/upload-preview.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';
import { VideoComponent } from './components/video/video.component';
import { VideoQueueComponent } from './components/video-queue/video-queue.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadVideoComponent,
    HomeComponent,
    SideNavComponent,
    UploadPreviewComponent,
    LoginComponent,
    SignupComponent,
    VideoplayerComponent,
    VideoComponent,
    VideoQueueComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
