import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'node_modules/ngx-bootstrap/dropdown';

import { ModalModule } from 'node_modules/ngx-bootstrap/modal';
import { TooltipModule } from 'node_modules/ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
})
export class AppBootstrapModule {}
