import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEditPage } from './event-edit.page';

describe('EventEditPage', () => {
  let component: EventEditPage;
  let fixture: ComponentFixture<EventEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
