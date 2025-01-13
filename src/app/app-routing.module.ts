import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component'
import { UploadPreviewComponent } from './components/upload-preview/upload-preview.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { AuthGuardService } from './service/auth-guard.service';
 
const routes: Routes = [
  {path:'home', canActivate:[AuthGuardService], component:HomeComponent},
  {path:'upload-video', canActivate:[AuthGuardService], component:UploadVideoComponent},
  {path:'upload-preview', canActivate:[AuthGuardService], component:UploadPreviewComponent},
  {path:'', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'videoplayer', canActivate:[AuthGuardService], component:VideoplayerComponent},
  {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
