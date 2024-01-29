import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailPage } from './event-detail.page';

describe('EventDetailPage', () => {
  let component: EventDetailPage;
  let fixture: ComponentFixture<EventDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
