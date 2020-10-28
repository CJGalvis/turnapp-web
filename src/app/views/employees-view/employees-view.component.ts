import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkNavigation } from 'src/app/models/LinkNavigation';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})
export class EmployeesViewComponent implements OnInit {

  public navLinks: Array<LinkNavigation>;
  public activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Consulta',
        link: './list',
        index: 0,
        icon: 'search'
      },
      {
        label: 'Registro',
        link: './register',
        index: 1,
        icon: 'edit'
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
