import {Injectable} from '@angular/core';
import { URLSearchParams,Http,Headers, RequestOptions,Response } from '@angular/http';
import {bacsurl} from '../bacsurl';

import 'rxjs/add/operator/map'

@Injectable()
export class LoginServices{
  private bacsurl = bacsurl;

  constructor (private http: Http) {}

  login(email:string,password:string){
    return this.http.post(this.bacsurl+'/api/oauth/access_token', { "username": email, "password":password,"grant_type":"password","client_id":"123","client_secret":"123"})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }
}
