import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesMiniCardComponent } from './favourites-mini-card.component';

describe('FavouritesMiniCardComponent', () => {
  let component: FavouritesMiniCardComponent;
  let fixture: ComponentFixture<FavouritesMiniCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouritesMiniCardComponent]
    });
    fixture = TestBed.createComponent(FavouritesMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
