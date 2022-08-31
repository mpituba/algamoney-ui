import { ErrorHandlerService } from './../../core/error-handler.service';
import { Router } from '@angular/router';
import { Login } from './../../core/model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, ErrorHandler } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router,
              public auth: AuthService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {  }

  login(usuario: string, senha: string) {

    this.auth.login(usuario, senha)
      .then(() => {
        /* Redireciona a página inicial */
        this.router.navigate(['lancamentos/']);
      })
      .catch( erro => {
        this.errorHandler.handle(erro);
      });


  }

}
