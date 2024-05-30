import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-terminos-uso',
  templateUrl: './terminos-uso.component.html',
  styleUrls: ['./terminos-uso.component.css'],
})
export class TerminosUsoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Ajustar el scroll al inicio de la página cuando la navegación entre componentes ha finalizado
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
