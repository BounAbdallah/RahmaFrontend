import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';  // Importer dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction';  // Importer interactionPlugin
// import { locale } from '@fullcalendar/core';  // Importer le locale

@Component({
  selector: 'app-calendrier-trajets',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],  // Assurez-vous que FullCalendarModule est bien ici
  templateUrl: './calendrier-trajets.component.html',
  styleUrls: ['./calendrier-trajets.component.css']
})
export class CalendrierTrajetsComponent implements OnInit, AfterViewInit {

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
      { title: 'Trajet de Dakar à Aéroport', start: '2024-12-25T10:00:00', end: '2024-12-25T12:00:00', description: 'Client: Monsieur X, Montant: 10,000 FCFA' },
      { title: 'Trajet de Mbour à Dakar', start: '2024-12-26T09:00:00', end: '2024-12-26T11:00:00', description: 'Client: Madame Y, Montant: 8,000 FCFA' },
      { title: 'Trajet de Thiès à Saint-Louis', start: '2024-12-27T08:30:00', end: '2024-12-27T10:30:00', description: 'Client: Monsieur Z, Montant: 12,000 FCFA' },
      { title: 'Trajet de Dakar à Mbour', start: '2024-12-28T15:00:00', end: '2024-12-28T17:00:00', description: 'Client: Madame A, Montant: 15,000 FCFA' }
    ],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  changeView(view: string): void {
    switch (view) {
      case 'jour':
        this.calendarOptions.initialView = 'dayGridDay';
        break;
      case 'semaine':
        this.calendarOptions.initialView = 'dayGridWeek';
        break;
      case 'mois':
        this.calendarOptions.initialView = 'dayGridMonth';
        break;
    }
  }

  handleEventClick(info: any): void {
    const eventDetails = info.event.extendedProps.description;
    alert('Détails du trajet : ' + eventDetails);
  }
}
