import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicInfoMainComponent } from './clinic-info-main.component';

describe('ClinicInfoMainComponent', () => {
  let component: ClinicInfoMainComponent;
  let fixture: ComponentFixture<ClinicInfoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicInfoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicInfoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
