import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Ajustar el scroll al inicio de la página cuando la navegación entre componentes ha finalizado
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  title = 'GastosPersonales';
}
