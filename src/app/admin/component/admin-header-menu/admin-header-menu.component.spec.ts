import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderMenuComponent } from './admin-header-menu.component';

describe('AdminHeaderMenuComponent', () => {
  let component: AdminHeaderMenuComponent;
  let fixture: ComponentFixture<AdminHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHeaderMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
