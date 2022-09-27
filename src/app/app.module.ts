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

@NgModule({
  imports: [
    AppBootstrapModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'device', pathMatch: 'full' },
    ]),
    RouterModule.forChild([
      { path: 'network', component: NetworkConfigComponent },
      { path: 'apps', component: AppsComponent },
      { path: 'device', component: DeviceComponent },
    ]),
  ],

  declarations: [
    AppComponent,
    DeviceComponent,
    NavComponent,
    NaviLinkComponent,
    AppsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
