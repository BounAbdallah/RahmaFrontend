// notification.model.ts
export interface NotificationData {
  reservation_id: number;
  message: string;
  user_id: number;
}

export interface AppNotification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationData;
  // read_at: string | null; // Peut être null si la notification n'a pas été lue
  // created_at: string; // Date au format ISO
  // updated_at: string; // Date au format ISO

  // Propriété calculée pour savoir si la notification est lue ou non
  read?: boolean; // Cette propriété est facultative

  read_at: Date | null;
  created_at: Date; // Assurez-vous que cette propriété est incluse
  updated_at: Date;
}
