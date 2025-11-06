import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarPadrao } from './side-bar-padrao';

describe('SideBarPadrao', () => {
  let component: SideBarPadrao;
  let fixture: ComponentFixture<SideBarPadrao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarPadrao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarPadrao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
