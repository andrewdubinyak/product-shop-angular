import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-shop';
  showFiller = false;
  public isMenuCollapsed = true;
  opened = false;
  left = 'left';

  toggleSidebar(): any {
    this.opened = !this.opened;
  }
}
