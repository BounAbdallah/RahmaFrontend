import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-notification-chauffeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-chauffeur.component.html',
  styleUrls: ['./notification-chauffeur.component.css']
})
export class NotificationChauffeurComponent {
  searchQuery = '';
  selectedNotification: any = null;
  categories = ['Réservations', 'Messages importants', 'Notifications système'];
  notifications = [
    {
      title: 'Nouvelle réservation ajoutée',
      summary: 'Votre réservation pour le trajet Dakar-Aéroport a été confirmée.',
      timeAgo: 'Il y a 2 heures',
      category: 'Réservations',
      iconClass: 'bi-calendar-check-fill',
      status: 'Nouvelle',
      statusClass: 'bg-success',
      details: 'Votre réservation est confirmée pour le trajet prévu.',
      date: '2024-12-27 14:30'
    },
    {
      title: 'Retard signalé',
      summary: 'Le trajet Aéroport-Dakar a un retard de 30 minutes.',
      timeAgo: 'Il y a 4 heures',
      category: 'Messages importants',
      iconClass: 'bi-exclamation-triangle-fill',
      status: 'Nouvelle',
      statusClass: 'bg-warning',
      details: 'Le trajet Aéroport-Dakar a un retard de 30 minutes.',
      date: '2024-12-27 14:45'
    }
  ];
  filteredNotifications = [...this.notifications];
  archivedNotifications = ['Ancienne notification 1...', 'Ancienne notification 2...'];

  // Filter notifications by category
  filterByCategory(category: string) {
    this.filteredNotifications = this.notifications.filter(notification => notification.category === category);
  }

  // Handle search input
  filterNotifications() {
    this.filteredNotifications = this.notifications.filter(notification =>
      notification.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      notification.summary.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Handle actions on notifications (confirm, cancel)
  handleAction(action: string) {
    alert(`${action} action performed.`);
  }

  // Load more archived notifications
  loadMoreArchives() {
    this.archivedNotifications.push('Ancienne notification 3...', 'Ancienne notification 4...');
  }
}
