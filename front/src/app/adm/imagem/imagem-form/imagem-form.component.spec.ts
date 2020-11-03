import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemFormComponent } from './imagem-form.component';

describe('ImagemFormComponent', () => {
  let component: ImagemFormComponent;
  let fixture: ComponentFixture<ImagemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
