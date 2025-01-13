import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showHead :boolean=false;
  constructor(private router:Router){
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/signup') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit(): void {
    
  }
  title = 'youtube-ui';

}
