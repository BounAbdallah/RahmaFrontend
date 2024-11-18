import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

interface Notification {
  id: string;
  message: string;
  details: string; // Contenu supplémentaire (simulé ici)
  read: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  selectedNotification: Notification | null = null;
  unreadCount = 0;
  isModalOpen = false;
  allNotificationsRead = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        console.log('Notifications reçues :', data); // Vérifiez les données ici
        // Filtrer les notifications lues (celles qui ont un ID dans localStorage)
        this.notifications = data
          .map((notification: any) => ({
            id: notification.id,
            message: notification.message,
            read: notification.read_at !== null,
            createdAt: notification.created_at,
          }))
          .filter((notification: { id: string; }) => !this.isNotificationRead(notification.id));

        this.updateUnreadCount();
        this.allNotificationsRead = this.notifications.every((notification) => notification.read);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notifications', error);
      },
    });
  }

  openModal(notification: Notification) {
    this.selectedNotification = notification;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedNotification = null;
    this.isModalOpen = false;
  }

  markAsRead(notificationId: string | undefined) {
    if (!notificationId) {
      console.error('Notification ID is undefined.');
      return;
    }

    this.notificationService.markAsRead(notificationId).subscribe(() => {
      // Enregistrer l'ID de la notification lue dans localStorage
      this.markNotificationAsReadInLocalStorage(notificationId);

      // Supprimer la notification de la liste une fois marquée comme lue
      this.notifications = this.notifications.filter((n) => n.id !== notificationId);
      this.updateUnreadCount();
      this.allNotificationsRead = this.notifications.every((notification) => notification.read);
      this.closeModal();
    });
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe(() => {
      // Marquer toutes les notifications comme lues et les enregistrer dans localStorage
      this.notifications.forEach((notification) => {
        this.markNotificationAsReadInLocalStorage(notification.id);
      });
      this.notifications = [];
      this.updateUnreadCount();
      this.allNotificationsRead = true;
    });
  }

  private updateUnreadCount() {
    this.unreadCount = this.notifications.filter((n) => !n.read).length;
  }

  // Vérifier si la notification a été marquée comme lue
  private isNotificationRead(notificationId: string): boolean {
    const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
    return readNotifications.includes(notificationId);
  }

  // Marquer la notification comme lue dans localStorage
  private markNotificationAsReadInLocalStorage(notificationId: string) {
    const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
    if (!readNotifications.includes(notificationId)) {
      readNotifications.push(notificationId);
      localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
    }
  }
}
