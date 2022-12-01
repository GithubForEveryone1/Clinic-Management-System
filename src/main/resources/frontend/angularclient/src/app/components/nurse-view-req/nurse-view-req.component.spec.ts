import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseViewReqComponent } from './nurse-view-req.component';

describe('NurseViewReqComponent', () => {
  let component: NurseViewReqComponent;
  let fixture: ComponentFixture<NurseViewReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseViewReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseViewReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
