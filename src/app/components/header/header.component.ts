import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoServiceService } from 'src/app/service/video-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  picture_url: any
  constructor( private videoService: VideoServiceService,private route :Router) { }

  ngOnInit(): void {
    this.picture_url = localStorage.getItem('picture_url');
    console.log(this.picture_url)
    if(! this.picture_url){
      this.picture_url='assets/default-img.png'
    }
  }

  navigatetoHome(){
    this.route.navigate(['home'])
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.route.navigate(['']);
  }
  

}
