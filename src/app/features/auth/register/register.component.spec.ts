import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { RegisterComponent } from './register.component';

describe('[Integration] RegisterComponent', () => {
  let spectator: Spectator<RegisterComponent>;
  const createComponent = createComponentFactory({
    component: RegisterComponent,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
