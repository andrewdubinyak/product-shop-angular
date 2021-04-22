import {Component, OnInit} from '@angular/core';
import {NgbPanelChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-admin-header-menu',
  templateUrl: './admin-header-menu.component.html',
  styleUrls: ['./admin-header-menu.component.scss']
})
export class AdminHeaderMenuComponent implements OnInit {
  isContentOpen:any = {};

  constructor() {
  }

  toggleAccordion(event: NgbPanelChangeEvent) {
    this.isContentOpen[event.panelId] = event.nextState;
  }

  ngOnInit(): void {
  }

}
