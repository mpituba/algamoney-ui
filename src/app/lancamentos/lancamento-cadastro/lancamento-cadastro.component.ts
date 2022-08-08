import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias: any[] = [];

  /*
  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2},
  ];
  */


  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];



  pessoas = [
    {label: 'Alberto Nunes de Souza', value: 1},
    {label: 'Gilbeto Souza Maior', value: 2},
    {label: 'João Souza Santos', value: 3},
  ];



  constructor(private categoriaService: CategoriaService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit():void {
    this.carregarCategorias()
  }

  carregarCategorias() {

    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map((c:any) => ({ label: c.nome, value: c.codigo }));

      })
      .catch(erro => this.errorHandler.handle(erro));

  }

}
