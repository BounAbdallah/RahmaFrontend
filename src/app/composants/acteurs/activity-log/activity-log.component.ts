import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../core/services/activity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent implements OnInit {
  activities: Array<{ action: string; timestamp: string }> = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activities = this.activityService.getActivities();
    console.log('Activités chargées dans le composant :', this.activities); // Log loaded activities
  }

  clear() {
    this.activityService.clearActivities();
    this.activities = [];
    console.log('Activités supprimées.'); // Log the clear action
  }
}
