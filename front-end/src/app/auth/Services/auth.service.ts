import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../core/model/user.model';
import {URL} from '../../app.component';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  constructor(private http: Http) {
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
