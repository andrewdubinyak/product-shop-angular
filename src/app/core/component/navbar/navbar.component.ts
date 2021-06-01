import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SignInComponent} from '../../../shop/component/sign-in/sign-in.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isContentOpen: any = {};
  showFiller = false;
  public isMenuCollapsed = true;
  opened = false;
  left = 'left';
  categories: any = [];
  panelId: any;


  constructor(private categoryService: CategoryService,
              private modalService: NgbModal) {
  }

  toggleSidebar(): any {
    this.opened = !this.opened;
  }

  toggleAccordion(event: NgbPanelChangeEvent, idAccordion: number): any {
    this.panelId = event.panelId;
    this.isContentOpen[idAccordion] = event.nextState;
  }

  openSignInModal(): any {
    const modalRef = this.modalService.open(SignInComponent, {
      centered: true, windowClass: 'modal-signIn'
    });

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      res.map((category: any) => {
        this.categories.push(category);
      });
    });
  }
}
