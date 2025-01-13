import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { VideoClass } from '../video-class';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  picture_url:any;
  devUrl = 'https://nxkxdr3l14.execute-api.us-east-1.amazonaws.com/dev/';

  constructor(private http:HttpClient) { 
  }

  fetchAllVideos(): Observable<Array<VideoClass>> {
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : token ? token : ''
    })
    return this.http.get<Array<VideoClass>>(this.devUrl + 'fetchAllVideos',{headers});
  }

  updateVideoData(body:any):Observable<any>{
    return this.sendRequest(body, 'updateVideoData');
  }


  getSignedUrl(body:any){
    return this.sendRequest(body, 'getSignedUrl');
  }

  sendSignedRequest(signedUrl:string,file:any){
    const imageHeaders = new HttpHeaders();
		imageHeaders.append('Content-Type', file.type);
    console.log('request')
    
    return this.http.put(signedUrl,file,{headers:imageHeaders})
  }

  setVideoUrl(body:any){
    return this.sendRequest(body, 'setVideoUrl')
  }


  setThumbnailUrl(body:any){
    return this.sendRequest(body, 'setThumbnailUrl')
  }

  setPictureUrl(body:any){
    return this.sendRequest(body, 'setPictureUrl')
  }

  sendRequest(body:any, methodName:string){
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : token ? token : ''
    })
    return this.http.post(this.devUrl + methodName , body ,{headers})
    
  }


}
