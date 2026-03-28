import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalReviewComponent } from './international-review.component';

describe('InternationalReviewComponent', () => {
  let component: InternationalReviewComponent;
  let fixture: ComponentFixture<InternationalReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternationalReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternationalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
