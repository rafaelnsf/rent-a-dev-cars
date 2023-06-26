import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  subscriptions = new Subscription();
  title = 'alugueis';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    datasets: [
      {
        data: [], // Dados do gráfico serão atualizados dinamicamente
        label: 'Alugueis/Mês',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.listar();
  }

  async listar() {
    const subscription = this.dashboardService
      .getAlugueis()
      .subscribe(async (alugueis) => {
        const alugueisPorMes = this.calcularAlugueisPorMes(alugueis);
        this.atualizarDadosGrafico(alugueisPorMes);
      });
    this.subscriptions.add(subscription);
  }

  calcularAlugueisPorMes(alugueis: any[]): number[] {
    const alugueisPorMes = Array(12).fill(0);

    alugueis.forEach((aluguel) => {
      const dataInicial = new Date(aluguel.dataInicial);
      const mes = dataInicial.getMonth();
      alugueisPorMes[mes]++;
    });

    return alugueisPorMes;
  }

  atualizarDadosGrafico(alugueisPorMes: number[]) {
    this.lineChartData.datasets[0].data = alugueisPorMes.slice();
    this.lineChartData = { ...this.lineChartData };
  }
}
