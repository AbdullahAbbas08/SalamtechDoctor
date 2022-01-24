import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSchedualComponent } from './clinic-schedual.component';

describe('ClinicSchedualComponent', () => {
  let component: ClinicSchedualComponent;
  let fixture: ComponentFixture<ClinicSchedualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicSchedualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicSchedualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
