import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService : PessoaService,
              private messageService : MessageService,
              private errorHandler : ErrorHandlerService
              ) { }


  ngOnInit(): void {
  }

  salvar (form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({ severity: 'success',
        detail: 'Pessoa adicionada com sucesso!' });

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
