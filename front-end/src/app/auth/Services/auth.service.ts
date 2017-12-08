import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../core/model/user.model';
import {URL} from '../../app.component';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  constructor(private http: Http, private facebookService: FacebookService) {
    facebookService.init({
      appId: '199416317297030',
      version: 'v2.11'
    });
  }

  private static handleError(error: any) {
    const errorMessage = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

  login(user: User): Observable<boolean> {
    return this.http.post(URL + '/login', user)
      .map(res => res.json())
      .map((currentUser: User) => {
        if (!User.isNull(currentUser)) {
          this.isLoggedIn = true;
          // if (User.tokenNull(currentUser)) {
          //   const loginOptions: LoginOptions = {
          //     enable_profile_selector: true,
          //     return_scopes: true,
          //     scope: 'user_photos'
          //   };
          //   this.facebookService.login(loginOptions)
          //     .then((res: LoginResponse) => {
          //       console.log(res);
          //       currentUser.accessToken = res['authResponse']['accessToken'];
          //       currentUser.facebookId = res['authResponse']['userID'];
          //       this.accessToken(currentUser)
          //         .subscribe();
          //       this.facebookService.logout().then();
          //     })
          //     .catch(AuthService.handleError);
          // }
          return true;
        } else {
          this.isLoggedIn = false;
          return false;
        }
      })
      .catch(AuthService.handleError);
  }

  logOut(): Observable<boolean> {
    this.isLoggedIn = !this.isLoggedIn;
    return Observable.of(false);
  }

  register(user: User): Observable<boolean> {
    return this.http.post(URL + '/register', user)
      .map(response => response.json() as User)
      .map(currentUser => !User.isNull(currentUser))
      .catch(AuthService.handleError);
  }

}
