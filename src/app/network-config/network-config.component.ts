import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-network-config',
  templateUrl: './network-config.component.html',
  styleUrls: ['./network-config.component.scss'],
})
export class NetworkConfigComponent extends NavComponent implements OnInit {
  constructor() {
    super();
  }
}
