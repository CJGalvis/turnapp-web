import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  public isRunning: boolean = false;
  public currentUser: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private globalService: GlobalService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService
  ) { }

  ngAfterViewChecked(): void {
    this.globalService.getRunning().subscribe((value: boolean) => this.isRunning = value);
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.getDataCurrent();
  }

  getDataCurrent() {
    this.apiService.getCurrent().subscribe(
      (response: any) => {
        this.currentUser = response.data;
      },
      (err: any) => {
        const messageError = err.error.message || 'Ocurrió un error desconocido';
        this.messageService.longMessage(messageError);
      }
    )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
