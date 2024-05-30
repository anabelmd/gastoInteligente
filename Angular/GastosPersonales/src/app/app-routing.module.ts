import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { ContactoComponent } from './Componentes/contacto/contacto.component';
import { FormLogueoComponent } from './Componentes/form-logueo/form-logueo.component';
import { PoliticaPrivacidadComponent } from './Componentes/footer/politica-privacidad/politica-privacidad.component';
import { TerminosUsoComponent } from './Componentes/footer/terminos-uso/terminos-uso.component';
import { SobreNosotrosComponent } from './Componentes/footer/sobre-nosotros/sobre-nosotros.component';
import { CalculadoraComponent } from './Componentes/calculadora/calculadora.component';
import { FormRegistroComponent } from './Componentes/form-registro/form-registro.component';
import { PlanAhorroComponent } from './Componentes/plan-ahorro/plan-ahorro.component';

//En este archivo se hace referencia a los componentes, en el array de Routes.

const routes: Routes = [
  //{ path: 'listar', component: ListarComponent }, //despues de path: nombre del componente
  //{ path: 'add', component: AddComponent },
  //{ path: 'edit', component: EditComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: FormLogueoComponent },
  { path: 'registro', component: FormRegistroComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'terminos-uso', component: TerminosUsoComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'calculadora', component: CalculadoraComponent },
  { path: 'planes-ahorro', component: PlanAhorroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
