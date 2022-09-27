import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent extends NavComponent implements OnInit {
  constructor() {
    super();
  }
}
