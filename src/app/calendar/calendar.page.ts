import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  @Input() pageTitle: string = 'Календар';
  @Input() selectedDate: string = '';

  selectedYearMonth: any = '';
  currentYearMonth: string = '';
  highlightedDates: [] = [];
  currentMonthEvents: any = [];
  isLoading: boolean = false;

  // toaster info
  toasterType: string = '';
  toasterMessage: string = '';

  constructor(
    private eventService: EventsService,
    private datePipe: DatePipe
  ) {}

  ionViewWillEnter() {
    const currentDate = new Date();
    this.selectedDate = this.datePipe.transform(currentDate, 'dd.MM.yyyy')!;
    this.currentYearMonth = this.datePipe.transform(currentDate, 'yyyy/MM')!;
    this.loadEvents(this.currentYearMonth);
  }

  handleSelectedDateChange(date: string) {
    this.selectedDate = date;

    // Format the selectedYearMonth to a specific string required by the service.
    const newSelectedYearMonth = date
      .split('.')
      .reverse()
      .slice(0, 2)
      .join('/');
    if (newSelectedYearMonth !== this.currentYearMonth) {
      this.currentYearMonth = newSelectedYearMonth;
      this.loadEvents(this.currentYearMonth);
    }
  }

  private loadEvents(yearMonth: string) {
    this.isLoading = true;

    this.eventService.getMonthEvents(yearMonth).subscribe({
      next: (response) => {
        this.currentMonthEvents = response;

        this.highlightedDates = this.currentMonthEvents.flatMap(
          (event: any) => {
            return event.dates.map((currentDate: any) => {
              const formattedDate = this.datePipe.transform(
                currentDate.date,
                'yyyy-MM-dd'
              );
              return {
                date: formattedDate || '',
                textColor: '#0D0D0D',
                backgroundColor: '#FF7418',
              };
            });
          }
        );

        this.isLoading = false;
      },
      error: (error) => {
        this.toasterMessage = error.error.error;
        this.toasterType = 'error';
        this.isLoading = false;

        setTimeout(() => {
          this.resetToasters();
        }, 5000);
      },
    });
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }
}
