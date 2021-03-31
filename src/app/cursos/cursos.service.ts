import { Injectable } from '@angular/core';
import { HttpClient } from '@Angular/common/http';
import { Curso } from './curso';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }

  loadByID(id){
    return this.httpClient.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso){
    return this.httpClient.post(this.API, curso).pipe(take(1));  
  }

  private update(curso){
    return this.httpClient.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso){
    if(curso.id){
      return this.update(curso)
    }
    return this.create(curso);
  }

  remove(id){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
