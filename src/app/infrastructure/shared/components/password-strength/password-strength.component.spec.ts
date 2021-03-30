import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MockModule } from 'ng-mocks';

import { PasswordStrengthComponent } from './password-strength.component';

describe('[Integration] PasswordStrengthComponent', () => {
  // TODO: Get working using Spectator
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

  function updateForm(userEmail: string, userPassword: string): void {
    component.form.get('email')?.setValue(userEmail);
    component.form.get('password')?.setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set passwordMin, passwordSpecial, and passwordDigit to false when given an empty string for password', () => {
    updateForm('', '');
    expect(component.form.get('passwordMin')?.value).toBe(false);
    expect(component.form.get('passwordSpecial')?.value).toBe(false);
    expect(component.form.get('passwordDigit')?.value).toBe(false);
  });

  it('should set only passwordMin to true when given a string only password of sufficient length', () => {
    updateForm('', 'testtest');
    expect(component.form.get('passwordMin')?.value).toBe(true);
    expect(component.form.get('passwordSpecial')?.value).toBe(false);
    expect(component.form.get('passwordDigit')?.value).toBe(false);
  });

  it('should set only passwordSpecial to true when given a short password with only a special character', () => {
    updateForm('', '@');
    expect(component.form.get('passwordMin')?.value).toBe(false);
    expect(component.form.get('passwordSpecial')?.value).toBe(true);
    expect(component.form.get('passwordDigit')?.value).toBe(false);
  });

  it('should set only passwordDigit to true when given a short digit only password', () => {
    updateForm('', '1');
    expect(component.form.get('passwordMin')?.value).toBe(false);
    expect(component.form.get('passwordSpecial')?.value).toBe(false);
    expect(component.form.get('passwordDigit')?.value).toBe(true);
  });

  it('should set passwordMin and passwordSpecial to true when given a password of sufficient length with a special character', () => {
    updateForm('', 'testtest1');
    expect(component.form.get('passwordMin')?.value).toBe(true);
    expect(component.form.get('passwordSpecial')?.value).toBe(false);
    expect(component.form.get('passwordDigit')?.value).toBe(true);
  });

  it('should set only passwordMin and passwordDigit to true when given a string only password of sufficient length  with a digit', () => {
    updateForm('', 'testtest@');
    expect(component.form.get('passwordMin')?.value).toBe(true);
    expect(component.form.get('passwordSpecial')?.value).toBe(true);
    expect(component.form.get('passwordDigit')?.value).toBe(false);
  });

  it('should set set passwordMin, passwordSpecial, and passwordDigit to true when given a password that meets requirements', () => {
    updateForm('', 'testtest@1');
    expect(component.form.get('passwordMin')?.value).toBe(true);
    expect(component.form.get('passwordSpecial')?.value).toBe(true);
    expect(component.form.get('passwordDigit')?.value).toBe(true);
  });
});
