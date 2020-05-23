import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLoadingComponent } from './global-loading.component';
import { GlobalLoadingService } from 'App/core/global-loading/global-loading.service';
import { BehaviorSubject } from 'rxjs';

describe('GlobalLoadingComponent', () => {
  let component: GlobalLoadingComponent;
  let fixture: ComponentFixture<GlobalLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalLoadingComponent ],
      providers: [
        { provide: GlobalLoadingService, useValue: { showSpinner$: new BehaviorSubject(false) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
