import {Component, OnInit, trigger, transition, style, animate} from '@angular/core';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css'],
  animations: [
    trigger('cardtypography', [
      transition('void => *', [
        style({opacity: 0,
          '-ms-transform': 'translate3D(0px, 150px, 0px)',
          '-webkit-transform': 'translate3D(0px, 150px, 0px)',
          '-moz-transform': 'translate3D(0px, 150px, 0px)',
          '-o-transform': 'translate3D(0px, 150px, 0px)',
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out', style({opacity: 1,
          '-ms-transform': 'translate3D(0px, 0px, 0px)',
          '-webkit-transform': 'translate3D(0px, px, 0px)',
          '-moz-transform': 'translate3D(0px, 0px, 0px)',
          '-o-transform': 'translate3D(0px, 0px, 0px)',
          transform: 'translate3D(0px, 0px, 0px)',
        }))
      ])
    ])
  ]
})
export class TypographyComponent implements OnInit {

  constructor(private navbarTitleService: NavbarTitleService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Typography');
  }
}
