import {Injectable} from '@angular/core';
import { Response} from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';

import 'rxjs/add/operator/map'
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Injectable()
export class LoginServices{
  constructor (private http: InterceptorService,private oauthService: OAuthService) {}

  login(email:string,password:string){
      // Login-Url
        this.oauthService.loginUrl = "https://steyer-identity-server.azurewebsites.net/identity/connect/authorize"; //Id-Provider?
        
        // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = window.location.origin + "/index.html";
        
        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = "spa-demo";
        
        // The name of the auth-server that has to be mentioned within the token
        this.oauthService.issuer = "https://steyer-identity-server.azurewebsites.net/identity";
 
        // set the scope for the permissions the client should request
        this.oauthService.scope = "openid profile email voucher";
        
        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oauthService.oidc = true;
        
        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);
        
        // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
        this.oauthService.logoutUrl = "https://steyer-identity-server.azurewebsites.net/identity/connect/endsession?id_token={{id_token}}";
        
        // This method just tries to parse the token within the url when
        // the auth-server redirects the user back to the web-app
        // It dosn't initiate the login
        this.oauthService.tryLogin({});
      
      
      
    return this.http.post('/api/oauth/access_token', { "username": email, "password":password,"grant_type":"password","client_id":"123","client_secret":"123"})
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
