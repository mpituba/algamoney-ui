import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';


import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';



@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias: any[] = [];
  pessoas: any[] = [];
  lancamento: Lancamento = new Lancamento();

  /*
  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2},
  ];

  pessoas = [
    {label: 'Alberto Nunes de Souza', value: 1},
    {label: 'Gilbeto Souza Maior', value: 2},
    {label: 'João Souza Santos', value: 3},
  ];
  */

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];


  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService,
              private lancamentoService: LancamentoService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) { }

  ngOnInit():void {

    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando () {
    return Boolean(this.lancamento.codigo)
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then((lancamentoAdicionado) => {
      this.messageService.add({ severity: 'success',
          detail: 'Lançamento adicionado com sucesso!' });

          //form.reset();
          //this.lancamento = new Lancamento();

          /* Redirecionamento programático */
          this.router.navigate(['/lancamentos/novo', lancamentoAdicionado]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: NgForm) {

    this.lancamentoService.atualizar(this.lancamento)
      .then((lancamento: Lancamento) => {
        this.lancamento = lancamento;
        this.messageService.add({severity: 'success',
          detail: 'Lançamento alterado com sucesso!'});

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

    }

  carregarCategorias() {

    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map((c:any) => ({ label: c.nome, value: c.codigo }));

      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map((p:any) => ({ label: p.nome , value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset(new Lancamento);

    //redirecionamento programático
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
