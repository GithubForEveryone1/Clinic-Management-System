import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAddDiagnosisSuccessComponent } from './doc-add-diagnosis-success.component';

describe('DocAddDiagnosisSuccessComponent', () => {
  let component: DocAddDiagnosisSuccessComponent;
  let fixture: ComponentFixture<DocAddDiagnosisSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAddDiagnosisSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAddDiagnosisSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
