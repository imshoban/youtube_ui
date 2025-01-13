import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { VideoServiceService } from 'src/app/service/video-service.service';
@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})

export class UploadVideoComponent implements OnInit {
  signedUrl:string='';
  videoUrl:string='';
  constructor(private authService:AuthService, private route:Router, private videoService:VideoServiceService) { }
  loading:boolean=false;
  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.loading=true
    this.videoService.getSignedUrl({
      type : file.type,
      fileName : file.name,
      uploadType: 'videos'
    }).subscribe((res:any) => {
        console.log('url',res)
        this.signedUrl = res;
        console.log(this.signedUrl)
        this.videoService.sendSignedRequest(this.signedUrl,file)
          .subscribe((res:any) => {
            this.videoUrl = this.signedUrl.split('?')[0];
            this.videoService.setVideoUrl({ videoUrl: this.videoUrl})
            .subscribe((res:any)=>{
              this.loading = false
              console.log('end of upload video',res.videoId)
              this.route.navigate(['upload-preview'],{queryParams: { videoId: res.videoId }})
            })
          })
      })
  }
}
