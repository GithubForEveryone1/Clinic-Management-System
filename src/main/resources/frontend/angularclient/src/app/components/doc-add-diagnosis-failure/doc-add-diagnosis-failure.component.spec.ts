import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAddDiagnosisFailureComponent } from './doc-add-diagnosis-failure.component';

describe('DocAddDiagnosisFailureComponent', () => {
  let component: DocAddDiagnosisFailureComponent;
  let fixture: ComponentFixture<DocAddDiagnosisFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAddDiagnosisFailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAddDiagnosisFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
