import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home-seg-parte',
  templateUrl: './home-seg-parte.component.html',
  styleUrls: ['./home-seg-parte.component.css'],
})
export class HomeSegParteComponent implements AfterViewInit {
  mostrarTextoCompleto: boolean = false;
  mostrarTextoCompleto2: boolean = false;
  ngAfterViewInit(): void {
    this.mostrarParrafo();
    this.mostrarParrafo2();
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

  mostrarParrafo2(): void {
    const parrafo = document.getElementById('second-paragraph2');
    if (parrafo) {
      if (parrafo.style.display === 'none') {
        parrafo.style.display = 'block';
        this.mostrarTextoCompleto2 = true; // Cambia a true cuando el párrafo se muestra
      } else {
        parrafo.style.display = 'none';
        this.mostrarTextoCompleto2 = false; // Cambia a false cuando el párrafo se oculta
      }
    }
  }
}
