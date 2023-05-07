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
import { AutomovelService } from '../../services/automovel.service';
import { Subscription } from 'rxjs';
import {
  AlertController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MarcaInterface } from '../../types/marca.interface';
import { MarcaService } from '../../services/marca.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-automovel-form-page',
  templateUrl: './automovel-form-page.component.html',
})
export class AutomovelFormPageComponent
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  automovelForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number;
  marcas: MarcaInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private automovelService: AutomovelService,
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
    this.loadNacionalidades();
    this.loadAutomovelOnEditMode();
  }

  private async loadNacionalidades() {
    this.loadingService.on();
    this.subscription.add(
      this.marcaService.getMarcas().subscribe((response) => {
        this.marcas = response;
        this.loadingService.off();
      })
    );
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
        this.automovelService.getAutomovel(this.id).subscribe((automovel) => {
          this.automovelForm.patchValue({
            nome: automovel.nome,
            marca: automovel.marca,
            valorDiaria: automovel.valorDiaria,
            valorVeiculo: automovel.valorVeiculo,
            kmRodado: automovel.kmRodado,
            ano: automovel.ano,
          });
          this.loadingService.off();
        });
      }
    }
  }

  private initializeForm() {
    this.automovelForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaNomeAutomovelTeste(),
        ],
      ],
      marca: ['Marca do veiculo', Validators.required],
      valorDiaria: 100,
      valorVeiculo: 100000,
      kmRodado: '',
      ano: ['', Validators.required],
    });
  }

  validaNomeAutomovelTeste(): ValidatorFn {
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
        this.automovelService.save(this.automovelForm.value).subscribe(
          () => {
            this.router.navigate(['./automoveis']);
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do automovel',
              buttons: ['Ok'],
            });
            alerta.present();
          }
        )
      );
    } else {
      this.automovelService
        .update({
          ...this.automovelForm.value,
          id: this.id,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['./automoveis']);
          },
          error: async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível atualizar os dados do automovel',
              buttons: ['Ok'],
            });
            alerta.present();
          },
        });
    }
  }

  cancel(): void {
    this.router.navigate(['./automoveis']);
  }

  compareWith(o1: MarcaInterface, o2: MarcaInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
