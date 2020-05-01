import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeSwitcherComponent } from './page-size-switcher.component';

describe('PageSizeSwitcherComponent', () => {
  let component: PageSizeSwitcherComponent;
  let fixture: ComponentFixture<PageSizeSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSizeSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSizeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
