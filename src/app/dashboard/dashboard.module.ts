import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from './services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgChartsModule,
    HttpClientModule,
  ],
  declarations: [DashboardPage],
  providers: [DashboardService],
})
export class DashboardPageModule {}
