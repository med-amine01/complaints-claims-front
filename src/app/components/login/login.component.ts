import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {LoginResponse} from "../../common/login-response";
import {Router} from "@angular/router";
import {UserAuthService} from "../../services/user-auth.service";
import {User} from "../../common/user";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  currentUser !: User;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authService: UserAuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      const requestLogin = {
        username: username,
        userPassword: password
      }
      this.userService.login(requestLogin).subscribe(
        (res: LoginResponse) => {
          this.authService.setToken(res.results.accessToken);
          localStorage.setItem("username", username);
          this.router.navigate(['complaints']);
        },
        err => {
          Swal.fire({
            title: "Login Failed",
            text: "Wrong credentials",
            icon: "error"
          });
        }
      )
    }
  }

  connectedUser(username: string) {
    this.userService.getUserByName(username).subscribe(
      (res) => {
        this.currentUser = res;
      },
      (err) => {
        console.log(err)
      }
    );
  }
}


