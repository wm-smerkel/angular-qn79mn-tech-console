import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DeviceComponent } from './device/device.component';
import { NetworkConfigComponent } from './network-config/network-config.component';

@NgModule({
  imports: [
    AppBootstrapModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: DeviceComponent },
      { path: '/network', component: NetworkConfigComponent },
    ]),
  ],
  declarations: [AppComponent, DeviceComponent, NavComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
