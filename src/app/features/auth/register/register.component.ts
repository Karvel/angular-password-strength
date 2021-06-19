import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatchFieldValidator } from '../../../infrastructure/utils/validators/match-field-validator';
import { PasswordValidator } from '../../../infrastructure/utils/validators/password-validator';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.createForm();
  }
  private createForm(): FormGroup {
    const form = this.fb.group({
      email: [''],
      password: [
        '',
        Validators.compose([PasswordValidator.validPassword(true)]),
      ],
      confirmPassword: [''],
      passwordMin: { value: false, disabled: true },
      passwordDigit: { value: false, disabled: true },
      passwordSpecial: { value: false, disabled: true },
      passwordSlider: { value: 0, disabled: true },
    },
    {
      validator: Validators.compose([
        MatchFieldValidator.validFieldMatch('password', 'confirmPassword', 'Password'),
      ]),
    });

    return form;
  }
}
