import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AluguelAutomovelService } from '../../services/aluguel-automovel.service';
import { Subscription } from 'rxjs';
import {
  AlertController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AutomovelInterface } from '../../types/automovel.interface';
import { AutomovelService } from '../../services/automovel.service';

@Component({
  selector: 'app-aluguel-automovel-form-page',
  templateUrl: './aluguel-automovel-form-page.component.html',
})
export class AluguelAutomovelFormPageComponent
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  aluguelautomovelForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number;
  automoveis: AutomovelInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private aluguelautomovelService: AluguelAutomovelService,
    private alertController: AlertController,
    private automovelService: AutomovelService,
    private loadingService: LoadingService
  ) {}

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }

  ngOnInit(): void {
    this.loadingService;
    this.initializeForm();
    this.loadAluguelAutomovelOnEditMode();
    this.loadAutomoveis();
  }
  private async loadAutomoveis() {
    this.loadingService.on();
    this.subscription.add(
      this.automovelService.getAutomoveis().subscribe((response) => {
        this.automoveis = response;
        this.loadingService.off();
      })
    );
  }

  private loadAluguelAutomovelOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on();
        this.aluguelautomovelService
          .getAluguel(this.id)
          .subscribe((aluguel) => {
            this.aluguelautomovelForm.patchValue({
              veiculo: aluguel.veiculo,
              nomeCliente: aluguel.nomeCliente,
              cpf: aluguel.cpf,
              dataInicial: aluguel.dataInicial,
              dataEntrega: aluguel.dataEntrega,
            });
            this.loadingService.off();
          });
      }
    }
  }

  private initializeForm() {
    this.aluguelautomovelForm = this.formBuilder.group({
      nomeCliente: [
        'Nome do Cliente',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaNomeClientesTeste(),
        ],
      ],
      veiculo: ['', Validators.required],
      cpf: '',
      dataInicial: '',
      dataEntrega: '',
    });
  }

  validaNomeClientesTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'teste') {
        return { invalidName: 'teste' };
      }
      if (value.includes('xyz')) {
        return { invalidName: 'xyz' };
      }
      return null;
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.aluguelautomovelService
          .save(this.aluguelautomovelForm.value)
          .subscribe(
            () => {
              this.router.navigate(['./alugueis']);
            },
            async () => {
              const alerta = await this.alertController.create({
                header: 'Erro',
                message: 'Não foi possível salvar os dados do aluguel',
                buttons: ['Ok'],
              });
              alerta.present();
            }
          )
      );
    } else {
      this.aluguelautomovelService
        .update({
          ...this.aluguelautomovelForm.value,
          id: this.id,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['./alugueis']);
          },
          error: async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível atualizar os dados do aluguel',
              buttons: ['Ok'],
            });
            alerta.present();
          },
        });
    }
  }

  cancel(): void {
    this.router.navigate(['./alugueis']);
  }
  compareWith(o1: AutomovelInterface, o2: AutomovelInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
