import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'home' },
    { title: 'Automoveis', url: '/automoveis', icon: 'car' },
    {
      title: 'Marcas',
      url: '/marcas',
      icon: 'cog',
    },
    { title: 'Aluguel Automoveis', url: '/alugueis', icon: 'cart' },
    {
      title: 'Automóveis Favoritos',
      url: '/automoveis/favoritos',
      icon: 'star',
    },
  ];
  constructor() {}
}
