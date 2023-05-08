import { Component, OnInit } from '@angular/core';
import { AutomovelInterface } from '../../types/automovel.interface';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-automoveis-favoritos-page',
  templateUrl: './automovel-favoritos-page.component.html',
})
export class AutomovelFavoritosPageComponent implements OnInit {
  automoveis: AutomovelInterface[] = [];

  constructor(private toastController: ToastController) {}

  ngOnInit(): void {
    const automoveisFavoritesLocalStorage = window.localStorage.getItem(
      'automoveisFavoritos'
    );
    this.automoveis = automoveisFavoritesLocalStorage
      ? JSON.parse(automoveisFavoritesLocalStorage)
      : [];
  }

  async unfavorite(automovel: AutomovelInterface) {
    this.automoveis = this.automoveis.filter((a) => a.id !== automovel.id);
    window.localStorage.setItem(
      'automoveisFavoritos',
      JSON.stringify(this.automoveis)
    );
    const toast = await this.toastController.create({
      color: 'warning',
      message: 'Automóvel favorito removido com sucesso!',
      duration: 8000,
      buttons: ['X'],
    });
    toast.present();
  }
}
