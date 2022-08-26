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

    /* Pega o codigo de lancamento da página */
    const codigoLancamento = this.route.snapshot.params['codigo'];

    /* Define o título com a string informada */
    this.title.setTitle('Novo lançamento');

    /* Se possuir codigo de lancamento está em modo de edição */
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    /* Carrega categorias e pessoas via métodos apropriados */
    this.carregarCategorias();
    this.carregarPessoas();
  }



  /* Método que identifica o modo de edição do formulário */

  get editando () {
    return Boolean(this.lancamento.codigo)
  }




  /* Método que chama um novo formulário recebendo seus dados vazios,
      reseta o formulário com um novo objeto e redireciona a página
      para um nono lancamento na api. */

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset(new Lancamento);

    //redirecionamento programático
    this.router.navigate(['lancamentos/novo']);
  }




  /* Método decisório entre POST e PUT para Salvar dados do cadastro,
     chama o atualizarLancamento para dados existentes ou adicionarLancamento
     no caso de dados novos. */

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }



  /* Método que recebe dados do formulário e faz um POST via lancamentoService,
      envia mensagem de sucesso, retorna a tela de novo lancamento e lida
      com exceções de erro. */

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then((lancamentoAdicionado) => {
      this.messageService.add({ severity: 'success',
          detail: 'Lançamento adicionado com sucesso!' });

      //form.reset();
      //this.lancamento = new Lancamento();

      /* Redirecionamento programático para lancamento/novo */
      this.router.navigate(['/lancamentos/novo', lancamentoAdicionado]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }



  /* Método que recebe dados do formulário e faz um PUT via lancamentoService,
      envia mensagem de sucesso, retorna dados atualizados enviados pela api
      para a variável que apresenta na tela, atualiza título da página, e lida
      com exceções de erro. */

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



  /* Método que é chamado na carga de um lançamento e retorna tal lancamento
    de acordo com seu código e o passa para a variável que o apresenta na
    tela, é chamado no NgOnInit. Atualiza o título da página.  */

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }



  /* Método que é chamado para a carga de uma categoria e as lista via
      categoriaService lidando com seus erros.  */

  carregarCategorias() {

    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map((c:any) => ({ label: c.nome, value: c.codigo }));

      })
      .catch(erro => this.errorHandler.handle(erro));

  }


  /* Método que é chamado para a carga de uma pessoa e as lista via
      pessoaService lidando com seus erros.  */

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map((p:any) => ({ label: p.nome , value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }





  /* Método atualiza o título na  edição de um lancamento com a descrição
      do lancamento. */

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
