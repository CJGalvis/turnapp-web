import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'turnapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public currentYear: Date = new Date();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.router.navigate(['/dashboard'])
  }
}
