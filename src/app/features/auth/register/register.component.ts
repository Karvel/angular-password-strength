import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      password: [''],
    });

    return form;
  }
}
