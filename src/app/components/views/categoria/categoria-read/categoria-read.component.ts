import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaService } from '../categoria.service';
import { Categoria } from './../categoria.model';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css'],
})
export class CategoriaReadComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];
  categorias: Categoria[] = [];
  categorias$: Observable<Categoria[]> = this.service.findAll();

  constructor(private service: CategoriaService) {}

  ngOnInit(): void {
    // this.findAll();
  }

  // findAll(): void {
  //   this.service.findAll().subscribe((resposta) => {
  //     this.categorias = resposta;
  //   });
  // }
}
