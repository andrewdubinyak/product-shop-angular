import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  public isMenuCollapsed = true;
  opened = false;
  left = 'left'

  toggleSidebar() {
    this.opened = !this.opened
  }

  ngOnInit() {
  }
}
