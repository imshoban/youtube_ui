import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { VideoServiceService } from 'src/app/service/video-service.service';
import { VideoClass } from 'src/app/video-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videoList : any = [];
  loading:boolean = false
  constructor(private videoService:VideoServiceService, private route: Router, private http:HttpClient) { 
  }
 
  ngOnInit(): void {
    this.videoService.fetchAllVideos().subscribe((responseData) => {
      console.log(responseData)
      this.videoList = responseData;
    })
    
  }


}
