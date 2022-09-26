import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviLinkComponent } from './navi-link.component';

describe('NaviLinkComponent', () => {
  let component: NaviLinkComponent;
  let fixture: ComponentFixture<NaviLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaviLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
