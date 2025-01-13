import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-queue',
  templateUrl: './video-queue.component.html',
  styleUrls: ['./video-queue.component.css']
})
export class VideoQueueComponent implements OnInit {

  @Input()
  videoList!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
