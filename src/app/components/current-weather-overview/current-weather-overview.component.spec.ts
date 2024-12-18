import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherOverviewComponent } from './current-weather-overview.component';

describe('CurrentWeatherOverviewComponent', () => {
  let component: CurrentWeatherOverviewComponent;
  let fixture: ComponentFixture<CurrentWeatherOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherOverviewComponent]
    });
    fixture = TestBed.createComponent(CurrentWeatherOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
