export interface Reservation {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  annonceId?: number;
  dateReservation?: Date;
  status?: string;
  userId?: number;
  colisId?: number | null;
}
