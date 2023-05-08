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
import { Subscription } from 'rxjs';
import {
  AlertController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MarcaService } from '../../services/marca.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-marca-form-page',
  templateUrl: './marca-form-page.component.html',
})
export class MarcaFormPageComponent
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  marcaForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number;
  tiposDeCarro = [
    'Sedan',
    'SUV',
    'Hatchback',
    'Cupê',
    'Conversível',
    'Picape',
    'Van',
    'Minivan',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private marcaService: MarcaService,
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
    this.loadAutomovelOnEditMode();
  }

  private loadAutomovelOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on();
        this.marcaService.getMarca(this.id).subscribe((marca) => {
          this.marcaForm.patchValue({
            nome: marca.nome,
            proprietario: marca.proprietario,
            fundador: marca.fundador,
            dataCriacao: marca.dataCriacao,
            sede: marca.sede,
            tipoVeiculos: marca.tipoVeiculos,
          });
          this.loadingService.off();
        });
      }
    }
  }

  private initializeForm() {
    this.marcaForm = this.formBuilder.group({
      nome: [
        'Nome Marca',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaNomeMarcaTeste(),
        ],
      ],
      proprietario: '',
      fundador: '',
      dataCriacao: '',
      sede: '',
      tipoVeiculos: [[], this.validaTipoVeiculos()],
    });
  }

  validaNomeMarcaTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'teste') {
        return { invalidName: 'Nome Invalido' };
      }
      if (value.includes('xyz')) {
        return { invalidName: 'xyz' };
      }
      return null;
    };
  }

  validaTipoVeiculos(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selecoes = control.value;
      if (!selecoes || selecoes.length === 0) {
        return { nenhumaSelecao: true };
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
        this.marcaService.save(this.marcaForm.value).subscribe(
          () => {
            this.router.navigate(['./marcas']);
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados da marca',
              buttons: ['Ok'],
            });
            alerta.present();
          }
        )
      );
    } else {
      this.marcaService
        .update({
          ...this.marcaForm.value,
          id: this.id,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['./marcas']);
          },
          error: async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível atualizar os dados da marca',
              buttons: ['Ok'],
            });
            alerta.present();
          },
        });
    }
  }

  cancel(): void {
    this.router.navigate(['./marcas']);
  }
}
