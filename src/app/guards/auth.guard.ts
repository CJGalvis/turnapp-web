import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  canActivate() {
    if (this.authService.hasTokenSession()) {
      const token = this.authService.getToken();
      if (this.authService.isExpiredToken(token)) {
        this.messageService.longMessage('Su sesión a expirado');
        setTimeout(() => {
          localStorage.clear();
          this.router.navigate(['']);
          return false;
        }, 3000);
      } else {
        return true;
      }
    } else {
      localStorage.removeItem('turnapp');
      this.router.navigate(['']);
      return false;
    }
  }

}
