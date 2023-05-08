import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AutomovelListPageComponent } from './components/automovel-list-page/automovel-list-page.component';
import { AutomovelFormPageComponent } from './components/automovel-form-page/automovel-form-page.component';
import { AutomovelFavoritosPageComponent } from './components/automovel-favoritos-page/automovel-favoritos-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: AutomovelListPageComponent,
  },
  {
    path: 'cadastro',
    component: AutomovelFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: AutomovelFormPageComponent,
  },
  {
    path: 'favoritos',
    component: AutomovelFavoritosPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomovelRoutingModule {}
