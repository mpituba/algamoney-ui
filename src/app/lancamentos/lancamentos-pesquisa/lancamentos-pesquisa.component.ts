import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {


  lancamentos = [];
    /*{ tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017, 7, 13),
      dataPagamento: null, valor: 180, pessoa: 'Academia Top' }*/

  @ViewChild('tabela') grid!: Table;
  totalRegistros = 0;
  filtro = new LancamentoFiltro();

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos');
  }



  /* Método de pesquisa com filtro de lancamentos, que seta e retorna
     variáveis necessárias a paginação , retorna a pequisa de lancamentos
     e lida com os erros */

  pesquisar(pagina = 0): void {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  /* Muda de página passando os valores corretos na variável página e
      chama o método pesquisar com a página certa */

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }



  /* Método que carrega a caixa de exclusão do confirmationService, em caso
      que se confirma a exclusão o lancamento é passado ao método excluir(). */

  confirmarExclusao(lancamento: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }

    });
  }



  /* Método exclui um lancamento passado e ??? */

  excluir (lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if(this.grid.first === 0) {
          this.pesquisar();
        }else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success',
          detail: 'Lançamento excluído com sucesso!' })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
