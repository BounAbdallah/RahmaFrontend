import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount = 0;
  allNotificationsRead: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.updateUnreadCount();
        // Vérifier si toutes les notifications sont lues lors du chargement
        this.allNotificationsRead = this.notifications.every(notification => notification.read);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notifications', error);
      }
    });
  }

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.read = true; // Marquer la notification comme lue
          this.updateUnreadCount();
          // Vérifier si toutes les notifications sont lues après mise à jour
          this.allNotificationsRead = this.notifications.every(notification => notification.read);
        }
      },
      error: (error) => {
        console.error('Erreur lors du marquage de la notification', error);
      }
    });
}


  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach(notification => notification.read = true);
        this.updateUnreadCount();
        // Vérifier si toutes les notifications sont lues après marquage
        this.allNotificationsRead = this.notifications.every(notification => notification.read);
      },
      error: (error) => {
        console.error('Erreur lors du marquage de toutes les notifications', error);
      }
    });
  }

  private updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }
}
