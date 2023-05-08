import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { MarcaService } from '../../services/marca.service';
import { MarcaInterface } from '../../types/marca.interface';

@Component({
  selector: 'app-marca-list-page',
  templateUrl: './marca-list-page.component.html',
})
export class MarcaListPageComponent
  implements ViewWillEnter, ViewDidLeave, OnDestroy
{
  marcas: MarcaInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private marcaService: MarcaService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ionViewDidLeave(): void {
    this.marcas = [];
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

    const subscription = this.marcaService.getMarcas().subscribe(
      async (marcas) => {
        this.marcas = marcas;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de marcas carregada com sucesso!',
          duration: 8000,
          buttons: ['X'],
        });
        toast.present();
        busyLoader.dismiss();
      },
      async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de marcas',
          buttons: ['Ok'],
        });
        alerta.present();
        busyLoader.dismiss();
      }
    );
    this.subscriptions.add(subscription);
  }

  async remove(marca: MarcaInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a marca ${marca.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.marcaService.remove(marca).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }
}
