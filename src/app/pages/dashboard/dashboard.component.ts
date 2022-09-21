import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data$: Observable<any>;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getDashboardData().subscribe((data) => {
      this.data$ = of(data);
    });
  }
}
