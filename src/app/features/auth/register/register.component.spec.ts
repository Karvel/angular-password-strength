import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { RegisterComponent } from './register.component';

describe('[Integration] RegisterComponent', () => {
  let spectator: Spectator<RegisterComponent>;
  const createComponent = createComponentFactory({
    component: RegisterComponent,
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
