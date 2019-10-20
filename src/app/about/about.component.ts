import { Component, OnInit } from '@angular/core';
import {LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { flyInOut ,expand} from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  constructor(private leaderservice:LeaderService) { }

  ngOnInit() {
    this.leaderservice.getLeaders().subscribe(Leader => this.leaders = this.leaders);
    
  }

}

  