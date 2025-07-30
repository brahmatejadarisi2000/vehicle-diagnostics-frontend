import { Component } from '@angular/core';
import { LogDashboardComponent } from './features/dashboard/log-dashboard/log-dashboard.component';
import { FileUploadComponent } from './features/upload/file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FileUploadComponent, LogDashboardComponent],
})
export class AppComponent {
  title = 'vehicle-dashboard';
}
