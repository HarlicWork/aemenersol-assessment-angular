import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChartData } from 'src/app/models/ChartData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss'],
})
export class TableChartComponent implements OnInit {
  chartData$: Observable<ChartData>;

  subscription: Subscription;

  @Input() title: string;

  tableData: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.chartData$ = this.auth.getDashboardData();
    this.subscription = this.chartData$.subscribe((data) => {
      this.tableData = data.tableUsers;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
