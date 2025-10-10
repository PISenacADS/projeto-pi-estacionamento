import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Temporizador2 } from './temporizador2';

describe('Temporizador2', () => {
  let component: Temporizador2;
  let fixture: ComponentFixture<Temporizador2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Temporizador2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Temporizador2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
