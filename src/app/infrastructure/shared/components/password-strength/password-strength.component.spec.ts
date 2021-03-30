import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MockModule } from 'ng-mocks';

import { PasswordStrengthComponent } from './password-strength.component';

describe('[Integration] PasswordStrengthComponent', () => {
  let component: PasswordStrengthComponent;
  let fixture: ComponentFixture<PasswordStrengthComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PasswordStrengthComponent],
        imports: [
          ReactiveFormsModule,
          MockModule(MatFormFieldModule),
          MockModule(MatCheckboxModule),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      email: new FormControl('test@test.com'),
      password: new FormControl('test1234!'),
      passwordMin: new FormControl(false),
      passwordSpecial: new FormControl(false),
      passwordDigit: new FormControl(false),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
