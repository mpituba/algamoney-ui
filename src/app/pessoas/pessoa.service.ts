import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../core/model';

export class PessoaFiltro{
  nome: string = '';
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService implements OnInit {

  ngOnInit(): void {

    this.listarTodas();

  }

  pessoasUrl : string;

  constructor(private http: HttpClient) {

    this.pessoasUrl = `${environment.apiUrl}/pessoas`;

  }



  /* Método faz um GET na API de pessoas trazendo todos os registros, filtrando
      com base nos valores recebidos pelo filtro de pessoas. O objeto resultado
      retorna a lista de pessoas e total de elementos que retornarão em
      resultado.pessoa e resultado.total respectivamente. */

  pesquisar (filtro: PessoaFiltro): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then((response: any) => {

        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements'],
        };

        return resultado;
      });
  }



  /* Método faz um GET e retorna uma lista da API de pessoas sem filtragem */

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      let lista = this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response['content']);
      //console.log(lista);

      return lista;
  }



  /* Método faz GET na API de pessoas de acordo com o codigo */

  buscaPorCodigo (codigo: number): Promise<Pessoa> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then((response: any) => {

        return response;
      });
  }




  /* Método faz um POST na api de pessoas com base na pessoa informada. */

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return this.http.post<Pessoa>(this.pessoasUrl, pessoa,
          { headers })
          .toPromise();
  }




  /* Método faz PUT na API de pessoas */

  atualizar (pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`,
      pessoa, { headers })
      .toPromise();

  }



  /* Método faz um DELETE com base no codigo informado.  */

  excluir(codigo: number) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
      .toPromise();
  }




  /* Método faz um PUT na api de pessoas com base no codigo e configura
      o valor do parâmetro ativo. */

  mudarStatus( codigo: number, ativo: boolean ): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers})
      .toPromise();
  }




}
