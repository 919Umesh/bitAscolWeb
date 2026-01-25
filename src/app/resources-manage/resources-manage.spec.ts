import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesManageComponent } from './resources-manage';

describe('ResourcesManage', () => {
  let component: ResourcesManageComponent;
  let fixture: ComponentFixture<ResourcesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
