import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
