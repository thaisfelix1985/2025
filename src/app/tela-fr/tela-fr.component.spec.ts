import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaFrComponent } from './tela-fr.component';

describe('TelaFrComponent', () => {
  let component: TelaFrComponent;
  let fixture: ComponentFixture<TelaFrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaFrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaFrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
