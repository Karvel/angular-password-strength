import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent, MockModule } from 'ng-mocks';

import { PasswordStrengthComponent } from '../../../infrastructure/shared/components/password-strength/password-strength.component';
import { RegisterComponent } from './register.component';

describe('[Integration] RegisterComponent', () => {
  let spectator: Spectator<RegisterComponent>;
  const createComponent = createComponentFactory({
    component: RegisterComponent,
    declarations: [MockComponent(PasswordStrengthComponent)],
    imports: [
      ReactiveFormsModule,
      MockModule(MatCardModule),
      MockModule(MatFormFieldModule),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
