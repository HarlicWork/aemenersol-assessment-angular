import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from './dashboard.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data$: Observable<any>;
  chartData: any;
  chartDonut: any[];

  constructor(
    private auth: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    const dashboardData = this.dashboardService.getData();
    google.charts.load('current', { packages: ['corechart'] });

    this.buildChart(dashboardData);

    this.auth.getDashboardData().subscribe((data) => {
      if (data) {
        this.data$ = of(data);
      }
    });
  }

  buildChart(dashboardData: any[]) {
    const renderChart = (chart: any) => {
      let chartItems = [];
      chartItems.push(['Name', 'Value']);

      dashboardData.forEach((item) => {
        for (let i = 0; i < item.chartDonut.length; i++) {
          chartItems.push([item.chartDonut[i].name, item.chartDonut[i].value]);
        }
      });

      const data = google.visualization.arrayToDataTable(chartItems);

      const options = {
        title: 'Donut Chart',
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
}
