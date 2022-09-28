import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DeviceComponent } from './device/device.component';
import { NetworkConfigComponent } from './network-config/network-config.component';
import { AppsComponent } from './apps/apps.component';
import { DataComponent } from './data/data.component';
import { CloudComponent } from './cloud/cloud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipModule } from 'node_modules/ngx-bootstrap/tooltip';
@NgModule({
  imports: [
    AppBootstrapModule,
    TooltipModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'device', pathMatch: 'full' },
      { path: 'network', component: NetworkConfigComponent },
      { path: 'apps', component: AppsComponent },
      { path: 'device', component: DeviceComponent },
      { path: 'network', component: NetworkConfigComponent },
      { path: 'data', component: DataComponent },
      { path: 'cloud', component: CloudComponent },
    ]),
    BrowserAnimationsModule,
  ],

  declarations: [
    AppComponent,
    DeviceComponent,
    NavComponent,
    AppsComponent,
    NetworkConfigComponent,
    DataComponent,
    CloudComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
