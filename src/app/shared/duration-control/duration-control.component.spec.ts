import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationControlComponent } from './duration-control.component';
import { DurationPipe } from 'App/shared/duration.pipe';

describe('DurationControlComponent', () => {
  let component: DurationControlComponent;
  let fixture: ComponentFixture<DurationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationControlComponent, DurationPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
