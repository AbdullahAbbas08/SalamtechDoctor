import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FielderrorComponent } from './fielderror.component';

describe('FielderrorComponent', () => {
  let component: FielderrorComponent;
  let fixture: ComponentFixture<FielderrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FielderrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FielderrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
