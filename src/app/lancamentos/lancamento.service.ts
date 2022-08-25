import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Lancamento } from './../core/model';

export class LancamentoFiltro {
  descricao?: string = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number = 0;
  itensPorPagina: number = 2;
}


@Injectable({ providedIn: 'root' })
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient,
      private datePipe: DatePipe) {

  }

  /* Método que retorna lançamentos da api de lancamentos - Retorna
     todos os lançamentos com base nos critérios passados ao filtro
     de lançamentos. */

  pesquisar (filtro: LancamentoFiltro): Promise<any> {

   const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);



    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];


        const resultado = {
          lancamentos,
          total: response['totalElements'],
        };

        return resultado;
      });
  }

  /* Método que exclui um lancamento existente na api de lançamentos, com
      base em um codigo informado. */

  excluir(codigo: number){
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers})
      .toPromise();
  }

  /* Método que adiciona um lancamento na api de lancamentos - Adiciona
      um registro de lancamento com base em um lancamento informado. */

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl,
       lancamento, { headers })
      .toPromise();
  }

  /* Método usado para atualizar um lancamento existente na api de
      lancamentos. */

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,
       lancamento, { headers })
      .toPromise();
  }


  /* Método usado para fazer uma busca na api de lancamentos com
      base num código de lancamento existente. Retorna o tal lancamentos
      se este existir  */

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then((response: any) => {

        this.converterStringsParaDatas([response]);
        return response;
      });
  }


  /* Método que converte strings de datas para formato de data para
      o componente da interface de usuário */

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);


      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }

}
