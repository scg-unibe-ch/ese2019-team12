import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreatorPage } from './event-creator.page';

describe('EventCreatorPage', () => {
  let component: EventCreatorPage;
  let fixture: ComponentFixture<EventCreatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
