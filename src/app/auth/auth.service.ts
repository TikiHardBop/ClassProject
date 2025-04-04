import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered? : boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService 
{
  user = new BehaviorSubject<User>(null);

  private tokenExiprationTimer : any; 

  constructor(private http: HttpClient,
              private router : Router) {}

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExiprationTimer)
    {
      clearTimeout(this.tokenExiprationTimer);
    }
  }
  autoLogout(expirationDuration : number) 
  {
      this.tokenExiprationTimer = setTimeout( () => { this.logout();},expirationDuration);
  }

  autoLogin() 
  {
      const userData: 
      {
          email : string; 
          id    : string, 
          _token : string, 
          _tokenExpirationData : string; 
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData)
      {
        return;
      }

      const loadedUser = new User(userData.email, userData.id,userData._token, new Date(userData._tokenExpirationData));

      if (loadedUser.token)
      {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationData).getTime()  - new Date().getTime(); 
        this.autoLogout(expirationDuration);
      }

  }

  login(email: string, password: string) {
    console.log('doing login:' +  environment.firebaseAPIKey);
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(resData => 
        { 
          this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(resData => 
            { 
              this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
            }));
  }

  private handleAuthentication(email : string, userId :string, token : string, expiresIn : number)
  {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user           = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes : HttpErrorResponse)
  {
    console.log('doing login:' +  environment.firebaseAPIKey);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    console.log(errorRes.error.error.message);
    
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
    }
    return throwError(errorMessage);
  }
}
