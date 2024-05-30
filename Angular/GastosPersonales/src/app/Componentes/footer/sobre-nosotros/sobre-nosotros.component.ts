import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css'],
})
export class SobreNosotrosComponent implements AfterViewInit {
  mostrarTextoCompleto: boolean = false;
  ngAfterViewInit(): void {
    this.mostrarParrafo();
  }

  mostrarParrafo(): void {
    const parrafo = document.getElementById('second-paragraph');
    if (parrafo) {
      if (parrafo.style.display === 'none') {
        parrafo.style.display = 'block';
        this.mostrarTextoCompleto = true; // Cambia a true cuando el párrafo se muestra
      } else {
        parrafo.style.display = 'none';
        this.mostrarTextoCompleto = false; // Cambia a false cuando el párrafo se oculta
      }
    }
  }
}
