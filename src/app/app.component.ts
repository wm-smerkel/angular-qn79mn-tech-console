import { Component, OnInit } from '@angular/core';



declare var bootstrap: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        container: 'body',
        trigger: 'hover',
      });
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
