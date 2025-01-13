import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideoServiceService } from 'src/app/service/video-service.service';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
  videoId:any;
  videoUrl:any;
  videoResponse:any = [];
  likes_count = 0;
  dislikes_count = 0;
  videoList:any = [];
  videoAvailable:boolean = false;
  userSubscription:Subscription | undefined;
  constructor(private route:ActivatedRoute,private http:HttpClient, private videoService:VideoServiceService) {
    this.videoId = this.route.snapshot.queryParamMap.get('videoId');
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : token ? token : ''
    })
    this.http.get(`https://nxkxdr3l14.execute-api.us-east-1.amazonaws.com/dev/fetchVideoUrl/${this.videoId}`, { headers}).subscribe((response:any )=> {
      this.videoResponse = response[0];
      console.log(this.videoResponse);
      this.likes_count = this.videoResponse.likes_count;
      this.dislikes_count = this.videoResponse.dislikes_count;
      this.videoUrl = this.videoResponse.url
      this.videoAvailable = true
    })
   }

  ngOnInit(): void {  
    this.videoService.fetchAllVideos().subscribe((responseData) => {
      console.log(responseData)
      this.videoList = responseData;
    })
  }

}
