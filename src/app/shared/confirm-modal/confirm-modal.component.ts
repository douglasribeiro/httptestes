import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult: Subject<boolean>;
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onClose(){
    this.confirmResult.next(false);
    this.bsModalRef.hide();
  }

  onConfirm(){
    this.confirmResult.next(true);
    this.bsModalRef.hide();
  }
}
