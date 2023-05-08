import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutomovelRoutingModule } from './aluguel-automovel-routing.module';
import { AluguelAutomovelListPageComponent } from './components/aluguel-automovel-list-page/aluguel-automovel-list-page.component';
import { AluguelAutomovelFormPageComponent } from './components/aluguel-automovel-form-page/aluguel-automovel-form-page.component';
import { AluguelAutomovelService } from './services/aluguel-automovel.service';
import { AutomovelService } from './services/automovel.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AutomovelRoutingModule,
  ],
  declarations: [
    AluguelAutomovelListPageComponent,
    AluguelAutomovelFormPageComponent,
  ],
  providers: [AluguelAutomovelService, AutomovelService],
})
export class AluguelAutomovelModule {}
