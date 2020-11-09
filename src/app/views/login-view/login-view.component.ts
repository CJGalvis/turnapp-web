import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'turnapp-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    })
  }

}
