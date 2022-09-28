import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppsComponent } from './apps/apps.component';
import { CloudComponent } from './cloud/cloud.component';
import { DataComponent } from './data/data.component';
import { DeviceComponent } from './device/device.component';

import { NetworkConfigComponent } from './network-config/network-config.component';

const routes: Routes = [
  { path: 'device', component: DeviceComponent },
  { path: 'apps', component: AppsComponent },
  { path: 'cloud', component: CloudComponent },
  { path: 'data', component: DataComponent },
  {
    path: 'network',
    component: NetworkConfigComponent,
  },

  { path: '**', redirectTo: 'device' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
