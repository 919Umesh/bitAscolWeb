import { TestBed } from '@angular/core/testing';

import { NoticesPaginationService } from './notices-pagination';

describe('NoticesPagination', () => {
  let service: NoticesPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticesPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
