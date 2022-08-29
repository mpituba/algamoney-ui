import { Router } from '@angular/router';
import { Login } from './../../core/model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

formLogin = new Login();


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {

    this.router.navigate(['lancamentos/']);


  }

}
