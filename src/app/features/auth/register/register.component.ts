import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        'testtest',
        Validators.compose([PasswordValidator.validPassword(true)]),
      ],
      passwordMin: { value: false, disabled: true },
      passwordDigit: { value: false, disabled: true },
      passwordSpecial: { value: false, disabled: true },
      passwordSlider: { value: 0, disabled: true },
    });

    return form;
  }
}
