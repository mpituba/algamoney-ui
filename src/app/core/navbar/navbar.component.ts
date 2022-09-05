import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  exibindoMenu : boolean = false;
  usuarioLogado: string = '';

  /*NavBar não funcioan sem o construtor e OnInit*/
  constructor(private auth: AuthService,
              private logoutService: LogoutService,
              private errorHandler: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  temPermissao (permissao: string) {
    return this.auth.temPermissao(permissao);
  }


  criarNovoAccessToken () {
    this.auth.obterNovoAccessToken();
  }


  logout () {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login'])
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
