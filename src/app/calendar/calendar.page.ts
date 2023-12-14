import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  constructor(
    private eventService: EventsService,
    private datePipe: DatePipe
  ) {}

  @Input() pageTitle: string = 'Календар';
  @Input() selectedDate: string = '';
  @Input() selectedYearMonth: string = '';
  currentYearMonth: string = '';
  highlightedDates: [] = [];
  currentMonthEvents: any = [];
  isLoading: boolean = false;

  handleSelectedDateChange(date: string) {
    this.selectedDate = date;
    // Format the selectedYearMonth to a specific string required by the service.
    this.selectedYearMonth = date.slice(3).replace('.', '/');
  }

  ngOnInit() {
    const currentDate = new Date();
    this.currentYearMonth = this.datePipe.transform(currentDate, 'yyyy/MM')!;

    this.isLoading = true; // Set isLoading to true when the data retrieval process starts

    this.eventService.getMonthEvents(this.currentYearMonth).subscribe({
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
                date: formattedDate || '', // Ensure a non-null value for 'date'
                textColor: '#0D0D0D',
                backgroundColor: '#FF7418',
              };
            });
          }
        );

        this.isLoading = false; // Set isLoading to false after successful data retrieval
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false; // Set isLoading to false if an error occurs
      },
    });
  }
}
