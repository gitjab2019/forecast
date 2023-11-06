import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASideComponent } from './a-side.component';

describe('ASideComponent', () => {
  let component: ASideComponent;
  let fixture: ComponentFixture<ASideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ASideComponent]
    });
    fixture = TestBed.createComponent(ASideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
