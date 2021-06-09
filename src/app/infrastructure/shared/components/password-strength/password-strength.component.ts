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

  public strengthHint = {
    strength: '',
  };

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

  public get passwordSlider(): AbstractControl {
    return this.form.get('passwordSlider') as AbstractControl;
  }

  private setIndicatorValues(controlValue: string): void {
    let passwordSliderMinValue = 0;
    let passwordSliderSpecialValue = 0;
    let passwordSliderDigitValue = 0;

    if (controlValue.length >= 8) {
      this.passwordMin.setValue(true);
      passwordSliderMinValue = 1;
    } else {
      this.passwordMin.setValue(false);
      passwordSliderMinValue = 0;
    }
    if (CONSTANTS.SYMBOL_REGEX.test(controlValue)) {
      this.passwordSpecial.setValue(true);
      passwordSliderSpecialValue = 1;
    } else {
      this.passwordSpecial.setValue(false);
      passwordSliderSpecialValue = 0;
    }
    if (CONSTANTS.DIGIT_REGEX.test(controlValue)) {
      this.passwordDigit.setValue(true);
      passwordSliderDigitValue = 1;
    } else {
      this.passwordDigit.setValue(false);
      passwordSliderDigitValue = 0;
    }
    this.passwordSlider.setValue(
      passwordSliderMinValue +
        passwordSliderSpecialValue +
        passwordSliderDigitValue
    );
    switch (this.passwordSlider.value) {
      case 0:
        this.strengthHint.strength = 'Weak';
        break;
      case 1:
        this.strengthHint.strength = 'Okay';
        break;
      case 2:
        this.strengthHint.strength = 'Good';
        break;
      case 3:
        this.strengthHint.strength = 'Strong';
        break;
    }
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
