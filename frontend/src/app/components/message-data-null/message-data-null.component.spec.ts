import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDataNullComponent } from './message-data-null.component';

describe('MessageDataNullComponent', () => {
  let component: MessageDataNullComponent;
  let fixture: ComponentFixture<MessageDataNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDataNullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDataNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
