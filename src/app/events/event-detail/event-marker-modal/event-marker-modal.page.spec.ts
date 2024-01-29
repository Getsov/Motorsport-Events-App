import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventMarkerModalPage } from './event-marker-modal.page';

describe('EventMarkerModalPage', () => {
  let component: EventMarkerModalPage;
  let fixture: ComponentFixture<EventMarkerModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventMarkerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
