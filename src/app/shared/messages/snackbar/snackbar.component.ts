import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  standalone: false
})
export class SnackbarComponent implements OnInit {

  message = '';
  snackVisibility = false; // boolean em vez de signal

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifier.subscribe(msg => {
      this.message = msg;
      this.snackVisibility = true;

      // Desaparecer após 3 segundos
      setTimeout(() => this.snackVisibility = false, 3000);
    });
  }
}
