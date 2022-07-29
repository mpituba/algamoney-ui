import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';



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
    private messageService: MessageService) {}

  ngOnInit(): void {
  }

  pesquisar(pagina = 0): void {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

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
  }

}
