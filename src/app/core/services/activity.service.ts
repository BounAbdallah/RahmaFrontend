import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private storageKey = 'userActivities';

  getActivities(): Array<{ action: string; timestamp: string }> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  clearActivities() {
    localStorage.removeItem(this.storageKey);
  }
}
