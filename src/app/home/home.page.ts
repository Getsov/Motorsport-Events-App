import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/shared/interfaces/Category';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {}
