import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsControlComponent } from './authors-control.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorsControlComponent', () => {
  let component: AuthorsControlComponent;
  let fixture: ComponentFixture<AuthorsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AuthorsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
