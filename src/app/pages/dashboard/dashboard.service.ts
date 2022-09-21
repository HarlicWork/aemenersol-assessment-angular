import { Injectable } from '@angular/core';
import { ChartData } from 'src/app/models/ChartData';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  chartData: ChartData[] = [
    {
      success: true,
      chartDonut: [
        {
          name: 'Donut 1',
          value: 25.0,
        },
        {
          name: 'Donut 2',
          value: 22.0,
        },
        {
          name: 'Donut 3',
          value: 29.0,
        },
        {
          name: 'Donut 4',
          value: 8.0,
        },
      ],
      chartBar: [
        {
          name: 'Bar 1',
          value: 30.0,
        },
        {
          name: 'Bar 2',
          value: 60.0,
        },
        {
          name: 'Bar 3',
          value: 56.0,
        },
        {
          name: 'Bar 4',
          value: 27.0,
        },
        {
          name: 'Bar 5',
          value: 5.0,
        },
        {
          name: 'Bar 6',
          value: 29.0,
        },
      ],
      tableUsers: [
        {
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
        {
          firstName: 'John',
          lastName: 'Doe 2',
          username: 'john_doe2',
        },
        {
          firstName: 'John',
          lastName: 'Doe 3',
          username: 'john_doe3',
        },
      ],
    },
  ];

  // chartData = [
  //   {
  //     name: 'Donut 1',
  //     value: 25.0,
  //   },
  //   {
  //     name: 'Donut 2',
  //     value: 22.0,
  //   },
  //   {
  //     name: 'Donut 3',
  //     value: 29.0,
  //   },
  //   {
  //     name: 'Donut 4',
  //     value: 8.0,
  //   },
  // ];

  constructor() {}

  getData() {
    return this.chartData;
  }
}
