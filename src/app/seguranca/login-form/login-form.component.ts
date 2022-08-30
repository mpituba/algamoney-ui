import { Router } from '@angular/router';
import { Login } from './../../core/model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

//logon = new Login();


  constructor(private router: Router,
              public auth: AuthService) { }

  ngOnInit(): void {  }

  login(usuario: string, senha: string) {
    //console.log(usuario);
    //console.log(senha);

    this.auth.login(usuario, senha);


    /* Direciona para a página inicial após logon */
    //this.router.navigate(['lancamentos/']);
  }

}
