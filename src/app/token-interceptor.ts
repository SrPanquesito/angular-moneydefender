import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response-payload';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    // Subject es como un Multi-Observable que puede ser consumido por varios observers (mantiene registro de sus listeners)
    // pero sus valores seran los mismos para todos los Observers. BehaviorSubject mantiene el estado anterior.
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // Agrega el JWT a los Headers y continua con el request
        if (this.authService.getJwtToken()) {
            this.addToken(req, this.authService.getJwtToken());
        }
        
        // En caso de que el request arroje un error de Unauthorized (403), mandaremos a refrescar JWT.
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
                return this.handleAuthErrors(req, next);
            } else {
                return throwError(error);
            }
        }));
    }
    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
                })
            )
        }
    }
    private addToken(req: HttpRequest<any>, jwtToken: String) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }

}