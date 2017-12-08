import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';
import {URL} from '../../app.component';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor (private http: Http) {
  }

  getUsers(): Observable<User[]> {
    /*
      returns all the users in the database
     */
    return this.http.get(URL + '/users')
      .map(res => res.json() as User[]);
  }

  getUser(userEmail: string): Observable<User> {
        /*
            email: the email of the user to look for
            returns the user fetched from the database
        */
    return this.http.post(URL + '/user/', userEmail)
      .map(res => res.json());
  }

  accessToken(user: User): Observable<User> {
        /*
            user: user requesting a long term access token
            returns the user fetched from the database with a long term access token
        */
    return this.http.post(URL + '/accessToken', user)
      .map(response => response.json() as User);
  }
}
