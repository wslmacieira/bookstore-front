import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from './../categoria.model';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css'],
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = {} as Categoria;
  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { categoria } = history.state;
    if (!!categoria) {
      return (this.categoria = categoria);
    }
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta;
    });
  }

  delete(): void {
    const res = this.service.delete(this.categoria.id!).subscribe({
      next: () => {
        // this.router.navigate(['categorias']);
        this.service.mensagem('Categoria deletada com sucesso!');
      },
      error: (e) => this.service.mensagem(e.error.error),
    });
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
