import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  breakpoint: number = 20;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() {
  }


  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

}
