import { TestBed } from '@angular/core/testing';

import { NoticesPagination } from './notices-pagination';

describe('NoticesPagination', () => {
  let service: NoticesPagination;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticesPagination);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
