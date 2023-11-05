import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CincoDiasComponent } from './cinco-dias.component';

describe('CincoDiasComponent', () => {
  let component: CincoDiasComponent;
  let fixture: ComponentFixture<CincoDiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CincoDiasComponent]
    });
    fixture = TestBed.createComponent(CincoDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
