import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutomovelRoutingModule } from './automovel-routing.module';
import { AutomovelListPageComponent } from './components/automovel-list-page/automovel-list-page.component';
import { AutomovelService } from './services/automovel.service';
import { MarcaService } from './services/marca.service';
import { AutomovelFormPageComponent } from './components/autor-form-page/automovel-form-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AutomovelRoutingModule,
  ],
  declarations: [AutomovelListPageComponent, AutomovelFormPageComponent],
  providers: [AutomovelService, MarcaService],
})
export class AutomovelModule {}
