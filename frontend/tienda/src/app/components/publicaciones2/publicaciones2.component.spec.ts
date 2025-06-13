import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publicaciones2Component } from './publicaciones2.component';

describe('Publicaciones2Component', () => {
  let component: Publicaciones2Component;
  let fixture: ComponentFixture<Publicaciones2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Publicaciones2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publicaciones2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
