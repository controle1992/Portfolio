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
    return this.http.get(URL + '/users')
      .map(res => res.json() as User[]);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get(URL + '/user/' + userId)
      .map(res => res.json());
  }
}
