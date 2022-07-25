import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  /*Não funcioan sem o construtor e OnInit*/
  constructor() { }

  ngOnInit() {
  }

  exibindoMenu : boolean = false;

}
