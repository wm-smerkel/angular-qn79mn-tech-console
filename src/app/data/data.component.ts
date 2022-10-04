import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'node_modules/ngx-logger'
import { WfaService } from '../wfa.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  foo: string = '';

  constructor(
    private wfaService: WfaService,

  ) {

  }

  async ngOnInit() {

  }

  public async getTest(test: string) {
    const resp = await this.wfaService.test(test);
    alert('Open ' + JSON.stringify(resp));
  }

}
