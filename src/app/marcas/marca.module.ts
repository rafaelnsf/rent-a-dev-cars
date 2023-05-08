import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaListPageComponent } from './components/marca-list-page/marca-list-page.component';
import { MarcaService } from './services/marca.service';
import { MarcaFormPageComponent } from './components/marca-form-page/marca-form-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MarcaRoutingModule,
  ],
  declarations: [MarcaListPageComponent, MarcaFormPageComponent],
  providers: [MarcaService],
})
export class MarcaModule {}
