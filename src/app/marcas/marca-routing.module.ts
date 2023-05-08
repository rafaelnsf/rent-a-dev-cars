import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MarcaListPageComponent } from './components/marca-list-page/marca-list-page.component';
import { MarcaFormPageComponent } from './components/marca-form-page/marca-form-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: MarcaListPageComponent,
  },
  {
    path: 'cadastro',
    component: MarcaFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: MarcaFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcaRoutingModule {}
