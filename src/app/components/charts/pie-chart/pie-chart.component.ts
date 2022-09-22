import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChartData } from 'src/app/models/ChartData';
import { AuthService } from 'src/app/services/auth.service';

declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  data$: Observable<any>;
  chartData$: Observable<ChartData>;

  subscription: Subscription;

  @Input() title: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
    this.chartData$ = this.auth.getDashboardData();
    this.subscription = this.chartData$.subscribe((data) => {
      this.buildChart(data);
    });
  }

  buildChart(dashboardData: ChartData) {
    const renderChart = (chart: any) => {
      let chartItems = [];
      chartItems.push(['Name', 'Value']);

      for (let i = 0; i < dashboardData.chartDonut.length; i++) {
        chartItems.push([
          dashboardData.chartDonut[i].name,
          dashboardData.chartDonut[i].value,
        ]);
      }

      const data = google.visualization.arrayToDataTable(chartItems);

      const options = {
        width: 600,
        height: 400,
      };

      chart().draw(data, options);
    };
    const pieChart = () =>
      new google.visualization.PieChart(document.getElementById('piechart'));

    const callBack = () => renderChart(pieChart);
    google.charts.setOnLoadCallback(callBack);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
