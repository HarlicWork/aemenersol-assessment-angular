export interface ChartData {
  success: boolean;
  chartDonut: DonutChart[];
  chartBar: BarChart[];
  tableUsers: TableUser[];
}

export interface DonutChart {
  name: string;
  value: number;
}

export interface BarChart {
  name: string;
  value: number;
}

export interface TableUser {
  firstName: string;
  lastName: string;
  username: string;
}
