import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroService } from '../livro.service';
import { Livro } from './../livro.model';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css'],
})
export class LivroReadComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];
  id_cat: string = '';
  livros: Livro[] = [];
  constructor(private service: LivroService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_cat = this.router.snapshot.paramMap.get('id_cat')!;
    this.findAll();
  }

  findAll() {
    this.service
      .findAllByCategoria(this.id_cat)
      .subscribe((resposta) => (this.livros = resposta));
  }
}
