import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAddReqSuccessComponent } from './nurse-add-req-success.component';

describe('NurseAddReqSuccessComponent', () => {
  let component: NurseAddReqSuccessComponent;
  let fixture: ComponentFixture<NurseAddReqSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseAddReqSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseAddReqSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
