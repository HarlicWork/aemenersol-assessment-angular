import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      username: ['user@aemenersol.com', [Validators.required]],
      password: ['Test@123', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    const formValue = this.form.value;
    this.auth.login(formValue.username, formValue.password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
