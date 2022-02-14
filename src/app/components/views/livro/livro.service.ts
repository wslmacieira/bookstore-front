import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAllByCategoria(id_cat: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  create(livro: Livro, id_cat: string): Observable<Livro> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.post<Livro>(url, livro);
  }

  mensagem(str: string): void {
    this._snack.open(str, 'OK', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
