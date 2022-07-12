import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PucCertificateComponent } from './puc-certificate.component';

describe('PucCertificateComponent', () => {
  let component: PucCertificateComponent;
  let fixture: ComponentFixture<PucCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PucCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PucCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
