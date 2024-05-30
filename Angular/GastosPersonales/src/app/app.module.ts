import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarComponent } from './Usuario/listar/ListarComponent';

import { ServiceService } from '../app/Service/service.service'; //importo el servicio
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './Componentes/footer/footer.component';
import { HomeComponent } from './Componentes/home/home.component';
import { ContactoComponent } from './Componentes/contacto/contacto.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { FormLogueoComponent } from './Componentes/form-logueo/form-logueo.component';
import { PoliticaPrivacidadComponent } from './Componentes/footer/politica-privacidad/politica-privacidad.component';
import { TerminosUsoComponent } from './Componentes/footer/terminos-uso/terminos-uso.component';
import { SobreNosotrosComponent } from './Componentes/footer/sobre-nosotros/sobre-nosotros.component';
import { CalculadoraComponent } from './Componentes/calculadora/calculadora.component';
import { FormRegistroComponent } from './Componentes/form-registro/form-registro.component';
import { HomeSegParteComponent } from './Componentes/home/home-seg-parte/home-seg-parte.component';
import { HomeTerParteComponent } from './Componentes/home/home-ter-parte/home-ter-parte.component';
import { FormAcordeonComponent } from './Componentes/calculadora/form-acordeon/form-acordeon.component';
import { AuthInterceptor } from '../app/interceptors/auth.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MovimientoService } from './Service/movimiento.service';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PieChartComponent } from './Componentes/pie-chart/pie-chart.component';
import { TabsComponent } from './Componentes/tabs/tabs.component';
import { PlanAhorroComponent } from './Componentes/plan-ahorro/plan-ahorro.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    FooterComponent,
    HomeComponent,
    ContactoComponent,
    HeaderComponent,
    FormLogueoComponent,
    PoliticaPrivacidadComponent,
    TerminosUsoComponent,
    SobreNosotrosComponent,
    CalculadoraComponent,
    FormRegistroComponent,
    HomeSegParteComponent,
    HomeTerParteComponent,
    FormAcordeonComponent,

    PieChartComponent,
    TabsComponent,
    PlanAhorroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [
    ServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MovimientoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
