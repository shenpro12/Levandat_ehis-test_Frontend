import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMenuModalComponent } from './delete-menu-modal.component';

describe('DeleteMenuModalComponent', () => {
  let component: DeleteMenuModalComponent;
  let fixture: ComponentFixture<DeleteMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMenuModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
