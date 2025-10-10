import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Temporizador } from './temporizador';

describe('Temporizador', () => {
  let component: Temporizador;
  let fixture: ComponentFixture<Temporizador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Temporizador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Temporizador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
