import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocViewReqComponent } from './doc-view-req.component';

describe('DocViewReqComponent', () => {
  let component: DocViewReqComponent;
  let fixture: ComponentFixture<DocViewReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocViewReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocViewReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
