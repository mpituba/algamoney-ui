import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.apiUrl + '/oauth/token';
  jwtPayload: any;


  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {

      this.carregarToken();

     }

  login (usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true   })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        if (response.status === 400) {

          /* 'invalid_grant' é o valor retornado no objeto de resposta da
            API na variável error, caso usuário ou senha sejam inválidos. */

          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuario ou senha inválidos!');

          }
        }
        return Promise.reject(response);
      });
  }



  private armazenarToken (token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }



  private carregarToken () {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }


  temPermissao (permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }


  obterNovoAccessToken (): Promise<void> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
       { headers, withCredentials: true  })
    .toPromise()
    .then((response: any) => {
      this.armazenarToken(response['access_token']);
    })
    .catch(response => {
      console.error('Erro ao renovar token.', response);
      console.log('Novo access token criado!');
      return Promise.resolve();
    });
  }



  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  /* Método verifica se há  ao menos uma permissão cadastrada */
  temQualquerPermissao (roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }

    }

    return false;
  }



  limparAccessToken () {

    localStorage.removeItem('token');

    this.jwtPayload = null;
  }

}
