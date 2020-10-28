import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';
import { Router } from '@angular/router';
import { MessageService } from './services/message.service';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private globalService: GlobalService,
        private router: Router,
        private messageService: MessageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.globalService.changeRunning(true);
        const token = this.authService.getToken() || 'bearer';
        const updatedRequest = request.clone({ headers: request.headers.set('Authorization', token) })
        return next.handle(updatedRequest).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        this.globalService.changeRunning(false);
                    }
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        this.globalService.changeRunning(false);
                        const httpError: HttpErrorResponse = error;
                        if (httpError.status == 403) {
                            this.messageService.longMessage('Su sesión a expirado');
                            setTimeout(() => {
                                localStorage.clear();
                                this.router.navigate(['']);
                            }, 3000);
                        }
                    }
                }
            )
        );
    }
}