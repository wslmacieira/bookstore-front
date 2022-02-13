import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css'],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {} as Categoria;
  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    this.service.create(this.categoria).subscribe(
      () => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria criada com sucesso!');
      },
      (err) => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message);
        }
      }
    );
  }
}
