import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CONSTANTS } from 'src/app/infrastructure/utils/constants';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStrengthComponent implements OnInit, OnDestroy {
  @Input() public form: FormGroup = new FormGroup({});

  private subscriptions: Subscription[] = [];

  public ngOnInit(): void {
    this.setInitialIndicatorValues();
    this.setupConditionalValidators();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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

  private setIndicatorValues(controlValue: string): void {
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

  /** Set the indicator values based on the initial password form control value. */
  private setInitialIndicatorValues(): void {
    this.setIndicatorValues(this.password.value);
  }

  /** Listens to the password input in the form and updates the requirements list. */
  private setupConditionalValidators(): void {
    const passwordControlSubscription: Subscription = this.password.valueChanges.subscribe(
      (controlValue: string) => this.setIndicatorValues(controlValue)
    );

    this.subscriptions.push(passwordControlSubscription);
  }
}
