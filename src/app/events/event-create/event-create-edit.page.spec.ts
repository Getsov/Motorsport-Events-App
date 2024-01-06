import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCreateEditPage } from './event-create-edit.page';

describe('EventCreatePage', () => {
  let component: EventCreateEditPage;
  let fixture: ComponentFixture<EventCreateEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
