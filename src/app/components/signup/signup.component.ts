import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { VideoServiceService } from 'src/app/service/video-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('preview') preview: ElementRef | undefined;
  @ViewChild('icon') icon: ElementRef | undefined;
  @ViewChild('preview_content') content: ElementRef | undefined;
  file: File | undefined;
  signedUrl: string='';
  picUrl: string='';
  responseJson:any;
  supportedFormat = ['jpeg','jpg','png', 'svg'];
  error:boolean = false;

  signupForm:any = FormGroup;
  registered:boolean = false;
  loading:boolean = false;
  isSupported:boolean=false;
  formatError:boolean = false;
  defaultImageUrl= 'https://aws-youtube-storage.s3.amazonaws.com/profile-pic/youtube.png';

  constructor(private authService:AuthService, private router : Router, private videoService:VideoServiceService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
  onFileSelected(event:any):void{
    this.file = event.target.files[0];
    console.log('file',this.file?.type)
    const type = this.file?.type.split('/')[1]
    console.log(type)
    if(type){
      this.isSupported = this.supportedFormat.includes(type);
    }
    const reader:FileReader = new FileReader();
    if(this.isSupported){
      if(this.file){
        reader.readAsDataURL(this.file);
        reader.onload =(e) => {
          const content = reader.result as string;
          if(this.preview){
            const Element = this.preview.nativeElement;
            Element.src = content;   
            Element.style.display='block';
            const icon = this.icon?.nativeElement;
            icon.style.display='none';
            const pcontent = this.content?.nativeElement;
            pcontent.style.display='none';
          }
        }
      } 
    }
    else{
      this.formatError = true
    }
  }

  signUp(){
    if(this.signupForm.status == 'INVALID'){return}
    this.loading=true
    this.authService.signupUser({
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    })
    .subscribe((res:any) => {
      this.responseJson = res
      if(res?.error){ 
        this.registered = true;
      }
      else{
        if(this.file){
          this.videoService.getSignedUrl({
          type : this.file.type,
          fileName : this.file.name,
          uploadType: 'profile-pic',
          signUp:true
        }).subscribe((res:any) => {
            console.log('url',res)
            this.signedUrl = res;
            this.videoService.sendSignedRequest(this.signedUrl,this.file)
              .subscribe((res:any) => {
                this.picUrl = this.signedUrl.split('?')[0];
                this.videoService.setPictureUrl({ picUrl: this.picUrl, userId:this.responseJson.userId })
                .subscribe(res => {
                  console.log(res);
                  this.loading=false
                  this.router.navigate([''],{state:{sucess: true}});

                })
              })
          })}
        else{
          this.videoService.setPictureUrl({picUrl: this.defaultImageUrl,userId:this.responseJson.userId})
          .subscribe((res:any) => {
            if(res?.error){
              this.error=true
            }
            this.loading=false
            this.router.navigate([''],{state:{sucess: true}});

          })
        }

      }
    })
  }



}
