import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpListeComponent } from './emp-liste.component';

describe('EmpListeComponent', () => {
  let component: EmpListeComponent;
  let fixture: ComponentFixture<EmpListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpListeComponent]
    });
    fixture = TestBed.createComponent(EmpListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
