import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

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

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {

  }

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

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      let lista = this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response.json().content);
      console.log(lista);

      return lista;
  }

  excluir(codigo: number) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
      .toPromise();
  }

}
