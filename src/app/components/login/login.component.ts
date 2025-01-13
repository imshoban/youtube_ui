import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { VideoServiceService } from 'src/app/service/video-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authError: boolean = false;
  loginForm:any = FormGroup;
  submitted:boolean = false;
  loginPage:boolean=false;
  registerError : boolean = false
  loading:boolean = false
  constructor(private authService:AuthService,
    private router:Router,
    private videoService:VideoServiceService,
    private appService:AppService,
    private localStorage:LocalStorageService,
    private route: ActivatedRoute) {
      console.log(this.route.snapshot.data)
      const state = this.route.snapshot.data;


    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  login(){
    this.loading=true
    this.submitted = true
    console.log(this.loginForm.status);
    if(this.loginForm.status == "INVALID"){
      return
    }
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password})
      .subscribe((res:any)=>{
        if(res.success){
          this.videoService.picture_url = res.picture_url;
          this.localStorage.setLoginSession(res.username, res.userId, res?.token, res.picture_url);
          this.router.navigate(['home']);
        }
        else{
          if(res?.notRegistered){
            this.registerError = true
          }
          else{
            this.authError = true;
          }
        }
        this.loading=false

      })
    
  }
  
}
