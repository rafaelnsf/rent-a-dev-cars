import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutomovelRoutingModule } from './aluguel-automovel-routing.module';
import { AluguelAutomovelListPageComponent } from './components/aluguel-automovel-list-page/aluguel-automovel-list-page.component';
import { AutomovelService } from './services/automovel.service';
import { MarcaService } from './services/marca.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AutomovelRoutingModule,
  ],
  declarations: [AluguelAutomovelListPageComponent],
  providers: [AutomovelService, MarcaService],
})
export class AluguelAutomovelModule {}
