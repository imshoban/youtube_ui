import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { VideoServiceService } from 'src/app/service/video-service.service';

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.css']
})
export class UploadPreviewComponent implements OnInit {
  @ViewChild('preview') preview: ElementRef | undefined;
  vid: string|null='';
  title:string='';
  description:string='';
  tags:string='';
  signedUrl:string='';
  thumbnailUrl:string='';
  videoDataForm:any = FormGroup;
  formError:boolean = false;
  file:File | undefined;
  loading:boolean = false;
  thumbnailImg:boolean = false



  constructor(private route :ActivatedRoute, private videoService:VideoServiceService, private router:Router,
    private localStroage:LocalStorageService) { }

  ngOnInit(): void {
    this.videoDataForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description :new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required])
    })
    this.vid = this.route.snapshot.queryParamMap.get('videoId');
  }
  onFileSelectedTemp(event:any):void{
    this.file = event.target.files[0];
    const reader:FileReader = new FileReader();
    if(this.file){
      reader.readAsDataURL(this.file);
      reader.onload =(e) => {
        const content = reader.result as string;
        if(this.preview){
          const Element = this.preview.nativeElement;
          Element.src = content;   
          Element.style.display='block';
        }
      }
    }
  }

  updateVideoData(){
    console.log('upload video')
    if(!this.file){this.thumbnailImg= true
      console.log('here')
    return}
    if(this.videoDataForm.status == 'INVALID'){return}
    this.loading=true
    this.videoService.updateVideoData({
      title:this.videoDataForm.value.title,
      description: this.videoDataForm.value.description,
      tags: this.videoDataForm.value.tags,
      video_id: this.vid,
      user_id:localStorage.getItem('userId')
    })
    .subscribe(response => {
      if(response?.error){ 
        this.formError = true;
      }
      else{
        if(this.file){
          this.videoService.getSignedUrl({
            videoId:this.vid,
            type : this.file.type,
            fileName : this.file.name,
            uploadType: 'thumbnails'
          }).subscribe((res:any) => {
              console.log('url',res)
              this.signedUrl = res;
              console.log(this.signedUrl)
              this.videoService.sendSignedRequest(this.signedUrl,this.file)
                .subscribe((res:any) => {
                  this.thumbnailUrl = this.signedUrl.split('?')[0];
                  this.videoService.setThumbnailUrl({ thumbnailUrl: this.thumbnailUrl, videoId:this.vid })
                  .subscribe(res => {
                    console.log(res);
                    this.loading=false
                    this.router.navigate(['home']);
                  })
                })
            })
        }
      }
    })

  }

}
