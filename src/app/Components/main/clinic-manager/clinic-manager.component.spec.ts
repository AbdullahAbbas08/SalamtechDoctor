import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicManagerComponent } from './clinic-manager.component';

describe('ClinicManagerComponent', () => {
  let component: ClinicManagerComponent;
  let fixture: ComponentFixture<ClinicManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
