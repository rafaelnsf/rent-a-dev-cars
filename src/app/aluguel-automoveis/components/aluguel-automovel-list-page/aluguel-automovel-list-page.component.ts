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
import { AutomovelInterface } from '../../types/aluguel-automovel.interface';

@Component({
  selector: 'app-aluguel-automovel-list-page',
  templateUrl: './aluguel-automovel-list-page.component.html',
})
export class AluguelAutomovelListPageComponent
  implements ViewWillEnter, ViewDidLeave, OnDestroy
{
  automoveis: AutomovelInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private autorService: AutomovelService,
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

    const subscription = this.autorService.getAutomoveis().subscribe(
      async (automoveis) => {
        this.automoveis = automoveis;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de automoveis carregada com sucesso!',
          duration: 15000,
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

  async alugado(automovel: AutomovelInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de Aluguel',
      message: `Deseja alugar esse veículo ${automovel.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.autorService
                .aluguel(automovel)
                .subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }
}
