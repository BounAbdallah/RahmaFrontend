import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';  // Importer dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction';  // Importer interactionPlugin

@Component({
  selector: 'app-calendrier-courses',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],  // Assurez-vous que FullCalendarModule est bien ici
  templateUrl: './calendrier-courses.component.html',
  styleUrls: ['./calendrier-courses.component.css']
})
export class CalendrierCoursesComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  // Options du calendrier FullCalendar
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',  // Vue par défaut : Mois
    locale: 'fr',  // Langue du calendrier définie sur le français
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    plugins: [dayGridPlugin, interactionPlugin],  // Ajout des plugins nécessaires
    events: [
      { title: 'Trajet de Dakar à Aéroport', start: '2024-12-25T10:00:00', end: '2024-12-25T12:00:00', description: 'Client: Amadou Diop, Montant: 10,000 FCFA' },
      { title: 'Trajet de Mbour à Dakar', start: '2024-12-26T09:00:00', end: '2024-12-26T11:00:00', description: 'Client: Fatou Ndiaye, Montant: 8,000 FCFA' },
      { title: 'Trajet de Thiès à Saint-Louis', start: '2024-12-27T08:30:00', end: '2024-12-27T10:30:00', description: 'Client: Mamadou Ba, Montant: 12,000 FCFA' },
      { title: 'Trajet de Dakar à Mbour', start: '2024-12-28T15:00:00', end: '2024-12-28T17:00:00', description: 'Client: Awa Fall, Montant: 15,000 FCFA' },
      { title: 'Livraison à Dakar Plateau', start: new Date().toISOString().split('T')[0] + 'T09:00:00', end: new Date().toISOString().split('T')[0] + 'T10:00:00', description: 'Client: Cheikh Sow, Montant: 5,000 FCFA' },
      { title: 'Livraison à Dakar Médina', start: new Date().toISOString().split('T')[0] + 'T11:00:00', end: new Date().toISOString().split('T')[0] + 'T12:00:00', description: 'Client: Mariama Diallo, Montant: 7,000 FCFA' },
      { title: 'Livraison à Dakar Yoff', start: new Date().toISOString().split('T')[0] + 'T14:00:00', end: new Date().toISOString().split('T')[0] + 'T15:00:00', description: 'Client: Ibrahima Sarr, Montant: 6,000 FCFA' },
      { title: 'Livraison à Dakar Almadies', start: new Date().toISOString().split('T')[0] + 'T16:00:00', end: new Date().toISOString().split('T')[0] + 'T17:00:00', description: 'Client: Khady Diouf, Montant: 8,000 FCFA' }
    ],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  changeView(view: string): void {
    const calendarApi = this.calendarComponent.getApi();
    switch (view) {
      case 'jour':
        calendarApi.changeView('dayGridDay');
        break;
      case 'semaine':
        calendarApi.changeView('dayGridWeek');
        break;
      case 'mois':
        calendarApi.changeView('dayGridMonth');
        break;
    }
  }

  handleEventClick(info: any): void {
    const eventDetails = info.event.extendedProps.description;
    alert('Détails du trajet : ' + eventDetails);
  }
}
