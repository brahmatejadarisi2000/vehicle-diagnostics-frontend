import { CommonModule } from '@angular/common';
import { HttpParams, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LogEntry } from 'src/app/core/models/log-entry.model';

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    ReactiveFormsModule]
})
export class LogDashboardComponent implements OnInit {

  searchForm!: FormGroup;
  logs: LogEntry[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      vehicleId: [''],
      code: [''],
      from: [''],
      to: ['']
    });
  }

  onSearch(): void {
    const { vehicleId, code, from, to } = this.searchForm.value;

    let params = new HttpParams();

    if (vehicleId) params = params.set('vehicle', vehicleId);
    if (code) params = params.set('code', code);
    if (from) params = params.set('from', new Date(from).toISOString());
    if (to) params = params.set('to', new Date(to).toISOString());

    this.http.get<LogEntry[]>('http://localhost:3000/api/logs', { params }).subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (err) => {
        console.error('Failed to fetch logs', err);
        alert('Error fetching logs');
      }
    });
  }

  trackByLog(index: number, log: any): string {
    return `${log.timestamp}-${log.vehicleId}`;
  }


}