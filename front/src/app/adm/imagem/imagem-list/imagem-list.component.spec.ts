import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemListComponent } from './imagem-list.component';

describe('ImagemListComponent', () => {
  let component: ImagemListComponent;
  let fixture: ComponentFixture<ImagemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
