import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { Pessoa } from 'src/app/core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService : PessoaService,
              private messageService : MessageService,
              private errorHandler : ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) { }


  ngOnInit(): void {

    /* Pega o codigo de lancamento da página */
    const codigoPessoa = this.route.snapshot.params['codigo'];

    /* Define o título com a string informada */
    this.title.setTitle('Nova Pessoa');

    /* Se possuir codigo de pessoa está em modo de edição */
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

  }




  /* Método que identifica o modo de edição do formulário */

  get editando () {
    return Boolean(this.pessoa.codigo)
  }




  novo (pessoaForm: NgForm) {
    pessoaForm.reset(new Pessoa);

    this.router.navigate(['pessoas/nova']);
  }



  /* Método decisório entre POST e PUT para salvar dados do cadastro,
    chama o atualizarPessoa para dados existentes ou adicionarPessoa
    no caso de dados novos. */

  salvar (form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }



  adicionarPessoa (form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({ severity: 'success',
        detail: 'Pessoa adicionada com sucesso!' });

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }



  /* Método que recebe dados do formulário e faz um PUT via pessoaService,
      envia mensagem de sucesso, retorna dados atualizados enviados pela API
      para a variável que apresenta na tela, atualiza título da página, e lida
      com exceções de erro. */

  atualizarPessoa (form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
    .then((pessoa: Pessoa) => {
      this.pessoa = pessoa;

      this.messageService.add({severity: 'success',
        detail: 'Pessoa alterada com sucesso!' });

      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }




  /* Método que é chamado na carga de uma pessoa e retorna tal pessoa de
      acordo com seu codigo e o passa para a variável que apresenta na tela,
      é chamado no NgOnInit. Atualiza o título da página.  */

  carregarPessoa (codigo: number) {
    this.pessoaService.buscaPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }



  /* Método atualiza Título da edição de pessoa com nome da pessoa */

  atualizarTituloEdicao () {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
