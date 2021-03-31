import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalContainerComponent } from 'ngx-bootstrap/modal';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //bsModalRef: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado: Curso;

  constructor(private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError( error => {
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. tente mais tarde.');
  }

  onDelete(curso){
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ =  this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover este curso?', 'Sim', 'Não');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover cursos. tente mais tarde.');
      }
    );
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover cursos. tente mais tarde.');
        this.deleteModalRef.hide();
      }
    );

  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }

}