import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'turnapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public currentYear: Date = new Date();

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.messageService.shortMessage('Debe ingresar credenciales válidas');
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        const messageError = err.error.message || 'Ocurrió un error desconocido';
        this.messageService.longMessage(messageError);
      }
    )
  }
}
