import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkNavigation } from 'src/app/models/LinkNavigation';

@Component({
  selector: 'turnapp-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss']
})
export class SettingsViewComponent implements OnInit {

  public navLinks: Array<LinkNavigation>;
  public activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Turnos',
        link: './shedules',
        index: 0,
        icon: 'av_timer'
      },
      {
        label: 'Categorías',
        link: './categories',
        index: 1,
        icon: 'category'
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      (res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
      }
    );
  }

}
