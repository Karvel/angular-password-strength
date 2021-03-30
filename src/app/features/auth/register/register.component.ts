import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CONSTANTS } from 'src/app/infrastructure/utils/constants';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.createForm();
    this.setupConditionalValidators();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      email: [''],
      password: [''],
      passwordMin: { value: false, disabled: true },
      passwordDigit: { value: false, disabled: true },
      passwordSpecial: { value: false, disabled: true },
    });

    return form;
  }

  private get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  private get passwordMin(): AbstractControl {
    return this.form.get('passwordMin') as AbstractControl;
  }

  private get passwordDigit(): AbstractControl {
    return this.form.get('passwordDigit') as AbstractControl;
  }

  private get passwordSpecial(): AbstractControl {
    return this.form.get('passwordSpecial') as AbstractControl;
  }

  /** Listens to the password input in the form and updates the requirements list. */
  private setupConditionalValidators(): void {
    const passwordControlSubscription: Subscription = this.password.valueChanges.subscribe(
      (controlValue: string) => {
        controlValue.length >= 8
          ? this.passwordMin.setValue(true)
          : this.passwordMin.setValue(false);
        CONSTANTS.SYMBOL_REGEX.test(controlValue)
          ? this.passwordSpecial.setValue(true)
          : this.passwordSpecial.setValue(false);
        CONSTANTS.DIGIT_REGEX.test(controlValue)
          ? this.passwordDigit.setValue(true)
          : this.passwordDigit.setValue(false);
      }
    );

    this.subscriptions.push(passwordControlSubscription);
  }
}
