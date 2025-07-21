import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraComponent } from './usera.component';

describe('UseraComponent', () => {
  let component: UseraComponent;
  let fixture: ComponentFixture<UseraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
