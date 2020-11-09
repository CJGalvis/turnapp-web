import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  public isRunning: boolean = false;
  public currentUser: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private globalService: GlobalService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) { }

  ngAfterViewChecked(): void {
    this.globalService.getRunning().subscribe((value: boolean) => this.isRunning = value);
    this.cdRef.detectChanges();
  }

  ngOnInit() {

  }

  logout() {
    localStorage.removeItem(this.globalService.nameApp);
    this.router.navigate(['']);
  }

}
