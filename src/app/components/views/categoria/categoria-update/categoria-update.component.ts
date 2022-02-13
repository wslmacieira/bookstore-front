import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from './../categoria.model';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css'],
})
export class CategoriaUpdateComponent implements OnInit {
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

  update() {
    this.service.update(this.categoria).subscribe({
      next: () => {
        this.service.mensagem('Categoria deletada com sucesso!');
        this.router.navigate(['categorias']);
      },
      error: (e) =>
        this.service.mensagem(
          'validar se todos os campos estão preenchidos corretamente!'
        ),
    });
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
