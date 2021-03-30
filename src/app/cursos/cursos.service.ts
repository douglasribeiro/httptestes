import { Injectable } from '@angular/core';
import { HttpClient } from '@Angular/common/http';
import { Curso } from './curso';
import { delay, tap } from 'rxjs/operators';
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
}
