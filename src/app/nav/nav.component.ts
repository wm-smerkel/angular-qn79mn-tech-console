import { Component, OnInit, Input, TemplateRef } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() templateRef: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        container: 'body',
        trigger: 'hover ',
      });
    });
  }
}
