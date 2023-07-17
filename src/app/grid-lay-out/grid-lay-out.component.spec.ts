import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLayOutComponent } from './grid-lay-out.component';

describe('GridLayOutComponent', () => {
  let component: GridLayOutComponent;
  let fixture: ComponentFixture<GridLayOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridLayOutComponent]
    });
    fixture = TestBed.createComponent(GridLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
