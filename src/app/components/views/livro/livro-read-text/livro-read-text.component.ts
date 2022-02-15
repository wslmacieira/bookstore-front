import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-text',
  templateUrl: './livro-read-text.component.html',
  styleUrls: ['./livro-read-text.component.css'],
})
export class LivroReadTextComponent implements OnInit {
  id_cat: string = '';
  livro: Livro = {} as Livro;

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    });
  }

  cancel() {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
