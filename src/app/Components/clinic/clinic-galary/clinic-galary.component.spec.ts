import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicGalaryComponent } from './clinic-galary.component';

describe('ClinicGalaryComponent', () => {
  let component: ClinicGalaryComponent;
  let fixture: ComponentFixture<ClinicGalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicGalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicGalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
