import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementFooterComponent } from './advertisement-footer.component';

describe('AdvertisementFooterComponent', () => {
  let component: AdvertisementFooterComponent;
  let fixture: ComponentFixture<AdvertisementFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
