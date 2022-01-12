import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletToWalletComponent } from './wallet-to-wallet.component';

describe('WalletToWalletComponent', () => {
  let component: WalletToWalletComponent;
  let fixture: ComponentFixture<WalletToWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletToWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletToWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
