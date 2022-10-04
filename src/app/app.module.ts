// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Forms
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Bootstrap
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { TooltipModule } from 'node_modules/ngx-bootstrap/tooltip';

// Other
import { HttpErrorInterceptor } from './http-error.interceptor';
import { LoggerModule, NgxLoggerLevel } from "node_modules/ngx-logger";
import { environment } from "../environments/environment";
// Components
import { NavComponent } from './nav/nav.component';
import { CloudComponent } from './cloud/cloud.component';
import { DataComponent } from './data/data.component';
import { DeviceComponent } from './device/device.component';
import { NetworkConfigComponent } from './network-config/network-config.component';

@NgModule({
  imports: [
    HttpClientModule,
    AppBootstrapModule,
    TooltipModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({ 
      serverLoggingUrl: "/assets/log.php",
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: environment.production ? NgxLoggerLevel.INFO : NgxLoggerLevel.OFF, // only log to server for production
      httpResponseType: "json",
    }),
  ],

  declarations: [AppComponent, NavComponent, CloudComponent, DataComponent, DeviceComponent, NetworkConfigComponent],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
