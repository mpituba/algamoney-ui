import { Router } from '@angular/router';
import { Login } from './../../core/model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

logon = new Login();


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    //console.log(this.logon.usuario);
    //console.log(this.logon.senha);

    /* Direciona para a página inicial após logon */
    this.router.navigate(['lancamentos/']);


  }

}
