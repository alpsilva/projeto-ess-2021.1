import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfReportComponent } from './perf-report.component';

describe('PerfReportComponent', () => {
  let component: PerfReportComponent;
  let fixture: ComponentFixture<PerfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
