import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSidebarComponent } from './clinic-sidebar.component';

describe('ClinicSidebarComponent', () => {
  let component: ClinicSidebarComponent;
  let fixture: ComponentFixture<ClinicSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
