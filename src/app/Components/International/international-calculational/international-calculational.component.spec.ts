import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalCalculationalComponent } from './international-calculational.component';

describe('InternationalCalculationalComponent', () => {
  let component: InternationalCalculationalComponent;
  let fixture: ComponentFixture<InternationalCalculationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternationalCalculationalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternationalCalculationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
