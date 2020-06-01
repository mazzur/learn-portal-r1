import { TestBed } from '@angular/core/testing';

import { AuthorsService } from './authors.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
