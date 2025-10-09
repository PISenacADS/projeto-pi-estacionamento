import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovelComponent } from './automovel.component';

describe('AutomovelComponent', () => {
  let component: AutomovelComponent;
  let fixture: ComponentFixture<AutomovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
