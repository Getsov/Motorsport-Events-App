import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Event } from 'src/shared/interfaces/Event';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  mockEvent: Event = {
    title: 'Драг Рейсинг на Кондофрей',
    imageUrl:
      'https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/336647635_186029427479392_3389018506494843726_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LHyD876d-rQAX-SWQ9P&_nc_ht=scontent.fsof8-1.fna&oh=00_AfAEeMnhiiEjYIDFUtzU3HZtFuUM91SO06_xGj1cC45yuw&oe=654C5316',
    shortDescription: 'Драг Рейсинг - Кондофрей [29-30 Април]',
    longDescription: `Събитието ще се проведе на познатата ни писта на летище Sofia West Airport, с. Кондофрей до гр. Радомир.
    Вход: 20лв - Такса свободни стартове: 50лв - Такса участие: 60лв`,
    dates: [{date: '29 Apr 2023', startTime: '9AM', endTime: '7:30PM'}, {date: '30 Apr 2023', startTime: '9AM', endTime: '7:30PM'}],
    contacts: {
      city: 'Кондофрей',
      address: 'Sofia West Airport',
      phone: '0888888888',
      email: 'kondofrey@abv.bg',
      coordinates: {lat: '42.448154', long: '22.963561'},
    },
    category: 'Драг',
    creator: 'Drag Racing Bulgaria',
    id: '01',
    isDeleted: false,
    likedCount: 2,
    price: 15
  };
  errorMessage: string = '';

  constructor(private activatedRoute: ActivatedRoute, private navController: NavController) {}

  ngOnInit () {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('eventId')) {
        this.navController.navigateBack('/tabs/events');
        return;
      }

      //   TODO: Fetch event from service
      //   eventsService.getEvent(paramMap.get('eventId').subscribe({
      //   next: (response) => {
      //     this.mockEvent = response;
      //   },
      //   error: (error) => {
      //     this.errorMessage = error.message;
      //   },
      // })
    })
  }
}
