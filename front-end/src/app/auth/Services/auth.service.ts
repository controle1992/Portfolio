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
    /*
      user: user to log in
      returns true if he's in the database,
      else returns false
     */
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

  register(user: User): Observable<boolean> {
    /*
      user: user to register
      returns false if he's already in the database,
      else returns false
     */
    return this.http.post(URL + '/register', user)
      .map(response => response.json() as User)
      .map(currentUser => !User.isNull(currentUser))
      .catch(AuthService.handleError);
  }

}
