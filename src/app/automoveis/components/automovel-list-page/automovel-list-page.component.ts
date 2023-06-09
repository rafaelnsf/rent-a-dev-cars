import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AutomovelService } from '../../services/automovel.service';
import { AutomovelInterface } from '../../types/automovel.interface';

@Component({
  selector: 'app-automovel-list-page',
  templateUrl: './automovel-list-page.component.html',
})
export class AutomovelListPageComponent
  implements ViewWillEnter, ViewDidLeave, OnDestroy
{
  automoveis: AutomovelInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private automovelService: AutomovelService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ionViewDidLeave(): void {
    this.automoveis = [];
  }

  ionViewWillEnter(): void {
    this.listar();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({
      spinner: 'circular',
    });
    busyLoader.present();

    const subscription = this.automovelService.getAutomoveis().subscribe(
      async (automoveis) => {
        this.automoveis = automoveis;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de automoveis carregada com sucesso!',
          duration: 8000,
          buttons: ['X'],
        });
        toast.present();
        busyLoader.dismiss();
      },
      async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de automoveis',
          buttons: ['Ok'],
        });
        alerta.present();
        busyLoader.dismiss();
      }
    );
    this.subscriptions.add(subscription);
  }

  async remove(automovel: AutomovelInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o automovel ${automovel.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.automovelService
                .remove(automovel)
                .subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

  async favorite(automovel: AutomovelInterface) {
    const automoveisFavoritesLocalStorage = window.localStorage.getItem(
      'automoveisFavoritos'
    );
    let arrayAutomoveisFavoritos = automoveisFavoritesLocalStorage
      ? JSON.parse(automoveisFavoritesLocalStorage)
      : [];

    const contain = arrayAutomoveisFavoritos.some(
      (a: AutomovelInterface) => a.id === automovel.id
    );
    arrayAutomoveisFavoritos = contain
      ? arrayAutomoveisFavoritos
      : [...arrayAutomoveisFavoritos, automovel];

    window.localStorage.setItem(
      'automoveisFavoritos',
      JSON.stringify(arrayAutomoveisFavoritos)
    );
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Automóvel favorito adicionado com sucesso!',
      duration: 8000,
      buttons: ['X'],
    });
    toast.present();
  }
}
