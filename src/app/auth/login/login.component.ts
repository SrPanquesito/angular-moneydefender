import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request-payload';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;
  loading: boolean;

  constructor(private authService : AuthService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username_l: new FormControl('', Validators.required),
      password_l: new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Registro Éxitoso');
          this.registerSuccessMessage = 'Revisa tu bandeja, te enviamos un correo de activación '
            + 'confirma tu cuenta antes de iniciar sesión!';
        }
      });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username_l').value;
    this.loginRequestPayload.password = this.loginForm.get('password_l').value;
    this.loading = true;
    console.log("Before request");

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.toastr.success('Inicio de sesión éxitoso');
    }, error => {
      this.isError = true;
      throwError(error);
    }).add(() => {
      this.loading = false;
      console.log("After request");
    });
  }

}
