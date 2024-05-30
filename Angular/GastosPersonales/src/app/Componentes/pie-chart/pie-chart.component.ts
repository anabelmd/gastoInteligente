import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Movimientos } from 'src/app/Modelo/Movimientos';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnChanges {
  @Input() movimientos: Movimientos[] = [];
  public chart: Chart | undefined;
  private coloresFijos: string[] = [
    'rgb(255, 99, 132)', // Rojo
    'rgb(54, 162, 235)', // Azul
    'rgb(255, 206, 86)', // Amarillo
    'rgb(75, 192, 192)', // Verde
  ];

  categoriasMap: { [key: string]: number[] } = {
    'Gastos del Hogar': [3, 4, 5, 6, 7],
    Transporte: [8, 9, 10, 11, 12],
    Educación: [13, 14, 15],
    'Gastos Personales': [16, 17, 18, 19, 20, 21],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movimientos'] && changes['movimientos'].currentValue) {
      this.actualizarGrafico();
    }
  }

  ngAfterViewInit(): void {
    this.actualizarGrafico();
  }

  private actualizarGrafico(): void {
    const data = this.prepararDatos();

    // Verificar si hay datos para mostrar en el gráfico
    if (data.datasets[0].data.length === 0) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = undefined; // Asegurarse de que el gráfico no se renderice
      }
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('myChart', {
      type: 'pie' as ChartType,
      data,
      options: {
        layout: {
          padding: 0, // Añade espacio alrededor del gráfico
        },
        plugins: {
          legend: {
            position: 'bottom', // Coloca la leyenda debajo del gráfico
            labels: {
              boxWidth: 20,
              padding: 15,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number;
                return `${label}: ${value.toFixed(2)}%`;
              },
            },
          },
          datalabels: {
            formatter: (value, context) => `${(value as number).toFixed(2)}%`,
            color: 'black',
            font: {
              weight: 'bold',
            },
            anchor: 'center',
            align: 'start',
            offset: 10,
            // Configuración para poner los datos fuera del círculo
            labels: {
              title: {
                align: 'end',
              },
            },
          },
        },
        elements: {
          arc: {
            borderWidth: 1, // Ancho del borde del segmento
            borderAlign: 'inner', // Alinea el borde dentro del segmento
            borderColor: 'rgba(0, 0, 0, 0.2)', // Color del borde del segmento
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }

  private prepararDatos(): any {
    const grupos: { [grupo: string]: number } = {
      Transporte: 0,
      Educación: 0,
      'Gastos del Hogar': 0,
      'Gastos Personales': 0,
    };

    this.movimientos.forEach((movimiento) => {
      if (movimiento.categoria && movimiento.categoria.idCategoria > 2) {
        for (const [grupo, ids] of Object.entries(this.categoriasMap)) {
          if (ids.includes(movimiento.categoria.idCategoria)) {
            grupos[grupo] += movimiento.cantidad || 0;
            break;
          }
        }
      }
    });

    const totalGastos = Object.values(grupos).reduce(
      (acc, valor) => acc + valor,
      0
    );

    if (totalGastos === 0) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverOffset: 4,
          },
        ],
      };
    }

    const porcentajes = Object.fromEntries(
      Object.entries(grupos).map(([grupo, cantidad]) => [
        grupo,
        (cantidad / totalGastos) * 100,
      ])
    );

    const labels = Object.keys(porcentajes);
    const data = {
      labels,
      datasets: [
        {
          data: Object.values(porcentajes),
          backgroundColor: this.coloresFijos.slice(0, labels.length),
          hoverOffset: 4,
        },
      ],
    };

    return data;
  }
}
