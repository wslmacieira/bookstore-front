import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css'],
})
export class LivroCreateComponent implements OnInit {
  id_cat: string = '';
  livro: Livro = {} as Livro;

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  getMessage(): string | boolean {
    if (this.titulo.invalid) {
      return 'O campo TITULO de conter entre 3 e 100 caracteres';
    }

    if (this.nome_autor.invalid) {
      return 'O campo NOME DO AUTOR de conter entre 3 e 2000000 caracteres';
    }

    if (this.texto.invalid) {
      return 'O campo TEXTO de conter entre 3 e 2000000 caracteres';
    }
    return false;
  }

  create() {
    this.service.create(this.livro, this.id_cat).subscribe({
      next: () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Livro criado com sucesso!');
      },
      error: () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Erro ao criar novo livro Tente mais tarde!');
      },
    });
  }

  cancel() {}
}
