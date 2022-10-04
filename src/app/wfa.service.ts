import { Injectable, Output, EventEmitter, EnvironmentInjector } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";

// rxjs
import { firstValueFrom } from "rxjs";

//interfaces
import { wfaNetworkIntf } from './interfaces/linuxNetworkIntf';

//other
import { environment } from "../environments/environment";
import { NGXLogger } from 'ngx-logger';
import { url } from 'inspector';

export let SERVER: string = "";
if (environment.production) {
  SERVER = window.location.hostname;
} else {
  SERVER = "localhost";
}

@Injectable({
  providedIn: 'root'
})
export class WfaService {
  private logID: string = "WfaService.";
  private debug = true;
  private BASE_URL: string = "";

  @Output() test$: EventEmitter<boolean> = new EventEmitter();
  @Output() networkSelected$: EventEmitter<boolean> = new EventEmitter();
  @Output() commandsSelected$: EventEmitter<boolean> = new EventEmitter();
  @Output() filesSelected$: EventEmitter<boolean> = new EventEmitter();

  constructor(  
    private http: HttpClient,
    private logger: NGXLogger,
  ) {
    this.BASE_URL = "http://" + SERVER + ":8080/";
    
  }

  private post(url: string, body: Object): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };
    return firstValueFrom(this.http.post(this.BASE_URL + url, body, httpOptions));
  }

  private get(url: string): Promise<any> {
    const URL = this.BASE_URL + url;
    if (this.debug) {
      this.logger.debug(`${this.logID}get >> URL = ${URL}`);
    }

    return firstValueFrom(this.http.get(URL));
  }

  public async runCommand(command: string): Promise<void> {
    try {
      return await this.get(command);
    } catch (error: any) {
      this.logger.error(`${this.logID}getStationAlarms >> error = ${error}`);
      throw new Error(error.toString());
    }
  }

  public async getNetwork(): Promise<wfaNetworkIntf> {
    try {
      return await this.get("get_interfaces");
    } catch (error: any) {
      this.logger.error(`${this.logID}getNetwork >> error = ${error}`);
      throw new Error(error.toString());
    }
  }
  public async test(foo: string): Promise<void> {
    try {

      return await this.get("get_interfaces");
    } catch (error: any) {
      this.logger.error(`${this.logID}test >> error = ${error}`);
      throw new Error(error.toString());
    }
  }

}
