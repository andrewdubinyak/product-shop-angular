import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  closeModal(): any {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit(): void {
  }

}
