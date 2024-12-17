import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCarouselComponent } from './horizontal-carousel.component';

describe('HorizontalCarouselComponent', () => {
  let component: HorizontalCarouselComponent;
  let fixture: ComponentFixture<HorizontalCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalCarouselComponent]
    });
    fixture = TestBed.createComponent(HorizontalCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
