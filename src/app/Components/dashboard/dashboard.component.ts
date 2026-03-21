import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ChartOptions } from 'chart.js';
import { Chart } from 'chart.js/dist';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClarityModule,CommonModule,FormsModule,NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
dataSource: any[] = [];
  filteredData: any[] = [];
  selectedExpenses: any[] = [];

  // KPI
  totalClaims = 0;
  totalAmount = 0;
  approvedCount = 0;
  pendingCount = 0;

  selectedType = '';
  selectedStatus = '';

  // Charts
  pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: []
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // 🔥 Replace with API
    this.dataSource = [
      {
        type: 'InternationExpense',
        date: new Date('2025-01-10'),
        purpose: 'Client Meeting',
        amount: 100000,
        status: 'Approved',
        expenses: [
          { particulars: 'Hotel', amount: 400 },
          { particulars: 'Travel', amount: 300 },
          { particulars: 'Allowance', amount: 300 }
        ]
      },
      {
        type: 'EXpense',
        date: new Date('2025-02-12'),
        purpose: 'Team Lunch',
        amount: 500,
        status: 'Pending',
          expenses: [
          { particulars: 'Hotel', amount: 4000 },
          { particulars: 'Travel', amount: 3000 },
          { particulars: 'Allowance', amount: 3000 }
        ]
        
      },
          {
        type: 'DomesticExpense',
        date: new Date('2025-02-12'),
        purpose: 'Team Lunch',
        amount: 500,
        status: 'Pending',
          expenses: [
          { particulars: 'Hotel', amount: 400 },
          { particulars: 'Travel', amount: 300 },
          { particulars: 'Allowance', amount: 300 }
        ]
        
      }
    ];

    this.filteredData = this.dataSource;
    this.calculateKPIs();
    this.prepareCharts();
  }

  calculateKPIs() {
    this.totalClaims = this.filteredData.length;
    this.totalAmount = this.filteredData.reduce((a, b) => a + b.amount, 0);
    this.approvedCount = this.filteredData.filter(x => x.status === 'Approved').length;
    this.pendingCount = this.filteredData.filter(x => x.status === 'Pending').length;
  }

  prepareCharts() {
    const typeMap: any = {};
    const monthMap: any = {};

    this.filteredData.forEach(c => {
      // Pie
      typeMap[c.type] = (typeMap[c.type] || 0) + c.amount;

      // Bar (month)
    //   const month = new Date(c.date).toLocaleString('default', { month: 'short' });
    //   monthMap[month] = (monthMap[month] || 0) + c.amount;
    });

    // PIE
    this.pieChartData = {
      labels: Object.keys(typeMap),
      datasets: [
        { data: Object.values(typeMap) }
      ]
    };
    
let grandTotal = 0;
this.dataSource.forEach(item => {
  const type = item.type.toLowerCase();

  if (!typeMap[type]) {
    typeMap[type] = 0;
  }

  typeMap[type] += item.amount;
  grandTotal += item.amount;
});
typeMap['total'] = grandTotal;

    // BAR
    this.barChartData = {
  labels: Object.keys(typeMap),
  datasets: [
    {
      data: Object.values(typeMap),
      label: 'Expense by Type'
    }
  ]
    };
  }

  applyFilters() {
    this.filteredData = this.dataSource.filter(x =>
      (!this.selectedType || x.type === this.selectedType) &&
      (!this.selectedStatus || x.status === this.selectedStatus)
    );

    this.calculateKPIs();
    this.prepareCharts();
  }

  onPieClick(event: any) {
    const index = event.active?.[0]?.index;
    if (index !== undefined) {
      const type = this.pieChartData.labels?.[index] as string;
      this.selectedType = type;
      this.applyFilters();

      this.selectedExpenses = this.filteredData.flatMap(x => x.expenses);
    }
  }

  getStatusClass(status: string) {
    return {
      'status-approved': status === 'Approved',
      'status-pending': status === 'Pending',
      'status-rejected': status === 'Rejected'
    };
  }
  }
