import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'automoveis',
    loadChildren: () =>
      import('./automoveis/automovel.module').then((a) => a.AutomovelModule),
  },
  {
    path: 'marcas',
    loadChildren: () =>
      import('./marcas/marca.module').then((a) => a.MarcaModule),
  },
  {
    path: 'alugueis',
    loadChildren: () =>
      import('./aluguel-automoveis/aluguel-automovel.module').then(
        (a) => a.AluguelAutomovelModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
