import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

import { MessageModule } from 'primeng/message';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule,
    SharedModule,
    MessageModule,
    TooltipModule

  ]
})
export class SegurancaModule { }
