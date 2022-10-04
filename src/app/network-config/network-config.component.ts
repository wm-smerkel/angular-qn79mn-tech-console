import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { WfaService } from '../wfa.service';
import { FormGroup, FormBuilder, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { wfaNetworkIntf } from '../interfaces/linuxNetworkIntf';
@Component({
  selector: 'app-network-config',
  templateUrl: './network-config.component.html',
  styleUrls: ['./network-config.component.scss'],
})
export class NetworkConfigComponent implements OnInit {
  private ipRegex: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  public Eth0Form: FormGroup;
  loading: boolean = false;

  //public Eth1Form: FormGroup;
 
  constructor (
    private wfaService: WfaService,
    private logger: NGXLogger,
    private formBuilder: FormBuilder,


  ) {
    this.Eth0Form = this.formBuilder.group({
      enabled: false,
      addresses: [[], Validators.required],
      gateway: ["",Validators.pattern(this.ipRegex)],
      nameserver1: ["", Validators.pattern(this.ipRegex)],
      nameserver2: ["", Validators.pattern(this.ipRegex)],
    });

    this.Eth0Form.get("eth0_dhcp")!.valueChanges.subscribe((enabled: boolean) => {
      //this.eth0GridEnabled = enabled;
      if (enabled === false) {
        // enable required field
        this.Eth0Form.controls["addresses"].enable();
        
        // clear fake data
       // this.eth0GridData = [];
      } else {
        // reset fields
        this.Eth0Form.controls["gateway"].patchValue("");
        this.Eth0Form.controls["nameserver1"].patchValue("");
        this.Eth0Form.controls["nameserver2"].patchValue("");
        this.Eth0Form.controls["addresses"].patchValue([]);
       // this.eth1GridData = [];

        // disable required field
        this.Eth0Form.controls["addresses"].disable();

        // push fake data to allow submit
        //this.eth1GridData.push({
        //  "guid": "",
      //    "address": "",
      //    "cidr": 1,
      //  });
      }
    });

  }

  async ngOnInit() {
    try {
      // set active class in navbar
      setTimeout(() => {
        this.wfaService.networkSelected$.emit(true);
      });

      // get eBox network
      //await this.refreshNetwork();
    } catch (error: any) {
      this.logger.error("NetworkComponent.ngAfterViewChecked >> error = " + error);
    }
  }

  async refreshNetwork() {
    try {
      this.loading = true;
      const wfaNetwork: wfaNetworkIntf = await this.wfaService.getNetwork();
      this.Eth0Form.setValue({
        "enabled": wfaNetwork.eth0_addresses.length ? true : false,
        "addresses": wfaNetwork.eth0_addresses,
        "gateway": wfaNetwork.eth0_gateway,
        "nameserver1": wfaNetwork.eth0_nameservers.length ? wfaNetwork.eth0_nameservers[0] : "",
        "nameserver2": wfaNetwork.eth0_nameservers.length > 1 ? wfaNetwork.eth0_nameservers[1]: "",    
      });

    } catch (error: any) {
      this.logger.error("NetworkComponent.refreshNetwork >> error = " + error);
      
    }
  }
  public onSubmitEth0(e: any) {

  }

}
