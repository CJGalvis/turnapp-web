import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'turnapp-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup;
  public isRunning: boolean = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private globalService: GlobalService
  ) {
    this.iconRegistry.addSvgIcon('img_1', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/login/undraw_Spreadsheet_re_cn18.svg'));
  }

  ngOnInit(): void {
    this.globalService.getRunning().subscribe((value: boolean) => this.isRunning = value);
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    })
  }

}
