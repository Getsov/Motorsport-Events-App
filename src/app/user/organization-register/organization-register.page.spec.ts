import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationRegisterPage } from './organization-register.page';

describe('OrganizationRegisterPage', () => {
  let component: OrganizationRegisterPage;
  let fixture: ComponentFixture<OrganizationRegisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrganizationRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
