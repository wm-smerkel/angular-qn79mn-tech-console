import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navi-link',
  templateUrl: './navi-link.component.html',
  styleUrls: ['./navi-link.component.scss'],
})
export class NaviLinkComponent {
  @Input() imgsrc: string;
  @Input() label: string;
  @Input() dest: string;

  constructor() {}

  ngOnInit(): void {}
}
