import { RouterTestingModule } from '@angular/router/testing';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { FooterComponent } from '../../infrastructure/shared/components/footer/footer.component';

import { AppComponent } from './app.component';

describe('[Integration] AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [MockComponent(FooterComponent)],
    imports: [RouterTestingModule],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it(`should have as title 'angular-password-strength'`, () => {
    const expectedValue = 'angular-password-strength';
    expect(spectator.component.title).toEqual(expectedValue);
  });
});
