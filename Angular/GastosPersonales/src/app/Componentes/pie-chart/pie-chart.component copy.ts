import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Movimientos } from 'src/app/Modelo/Movimientos';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnChanges {
  @Input() movimientos: Movimientos[] = []; // Modificar la definición de la propiedad movimientos
  public chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movimientos'] && changes['movimientos'].currentValue) {
      this.actualizarGrafico();
    }
  }

  ngAfterViewInit(): void {
    this.actualizarGrafico();
  }

  private actualizarGrafico(): void {
    // Preparar los datos para el gráfico
    const data = this.prepararDatos();

    // Actualizar el gráfico
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('myChart', {
      type: 'pie' as ChartType,
      data,
    });
  }

  private prepararDatos(): any {
    // Objeto para almacenar la cantidad total de gastos por grupo
    const grupos: { [grupo: string]: number } = {
      'Gastos del hogar': 0,
      Transporte: 0,
      'Sin grupo': 0,
    };

    // Iterar sobre los movimientos y sumar las cantidades por grupo
    this.movimientos.forEach((movimiento) => {
      const categoria = movimiento.categoria
        ? movimiento.categoria.nombreCategoria
        : 'Sin categoría';

      // Categorización de las categorías en grupos
      if (['Agua, gas y electricidad', 'Teléfono'].includes(categoria)) {
        grupos['Gastos del hogar'] += movimiento.cantidad || 0;
      } else if (['Coche, moto'].includes(categoria)) {
        grupos['Transporte'] += movimiento.cantidad || 0;
      } else {
        grupos['Sin grupo'] += movimiento.cantidad || 0;
      }
    });

    // Construir los datos en el formato esperado por Chart.js
    const labels = Object.keys(grupos);
    const data = {
      labels,
      datasets: [
        {
          data: Object.values(grupos),
          backgroundColor: this.generarColores(labels.length),
          hoverOffset: 4,
        },
      ],
    };

    return data;
  }

  private generarColores(numColores: number): string[] {
    // Generar colores aleatorios en formato RGB
    const colores: string[] = [];
    for (let i = 0; i < numColores; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colores.push(`rgb(${r},${g},${b})`);
    }
    return colores;
  }
}
