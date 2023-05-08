import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AluguelAutomovelService } from '../../services/aluguel-automovel.service';
import { AluguelAutomovelInterface } from '../../types/alugado-automovel.interface';

@Component({
  selector: 'app-aluguel-automovel-list-page',
  templateUrl: './aluguel-automovel-list-page.component.html',
})
export class AluguelAutomovelListPageComponent
  implements ViewWillEnter, ViewDidLeave, OnDestroy
{
  alugueis: AluguelAutomovelInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private aluguelAutomovelService: AluguelAutomovelService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ionViewDidLeave(): void {
    this.alugueis = [];
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

    const subscription = this.aluguelAutomovelService.getAlugueis().subscribe(
      async (alugueis) => {
        this.alugueis = alugueis;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de alugueis carregada com sucesso!',
          duration: 15000,
          buttons: ['X'],
        });
        toast.present();
        busyLoader.dismiss();
      },
      async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de alugueis',
          buttons: ['Ok'],
        });
        alerta.present();
        busyLoader.dismiss();
      }
    );
    this.subscriptions.add(subscription);
  }

  async remove(aluguel: AluguelAutomovelInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o aluguel do veiculo ${aluguel.veiculo}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.aluguelAutomovelService
                .remove(aluguel)
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
