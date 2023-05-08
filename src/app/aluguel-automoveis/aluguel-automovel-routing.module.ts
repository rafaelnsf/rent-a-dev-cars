import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AluguelAutomovelListPageComponent } from './components/aluguel-automovel-list-page/aluguel-automovel-list-page.component';
import { AluguelAutomovelFormPageComponent } from './components/aluguel-automovel-form-page/aluguel-automovel-form-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: AluguelAutomovelListPageComponent,
  },
  {
    path: 'cadastro',
    component: AluguelAutomovelFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: AluguelAutomovelFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomovelRoutingModule {}
