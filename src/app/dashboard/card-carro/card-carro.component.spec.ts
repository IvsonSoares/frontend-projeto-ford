import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarroComponent } from './card-carro.component';

describe('StockCardComponent', () => {
  let component: CardCarroComponent;
  let fixture: ComponentFixture<CardCarroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCarroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
