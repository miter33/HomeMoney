import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public message!: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.message = new Message('danger', '')
    this.route.queryParams
      .subscribe((params: Params) => {
        if(params['nowCanLogin']) {
          this.showMessage({
            text: 'You can get into the system',
            type: 'success' })
        } else if(params['accessDenied']) {
          this.showMessage({
            text: 'You must login to work on system',
            type: 'warning' })
        }
      })
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  public onSubmit(): void {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User | undefined) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            localStorage.setItem('user', JSON.stringify(user))
            this.authService.login();
            this.router.navigate(['/system/bill'])
          } else {
            this.showMessage({ text: 'Password is not correct', type: 'danger' })
          }
        } else {
          this.showMessage({ text: 'Such a user does not exist', type: 'danger' })
        }
      })
  }

  private showMessage(message: Message): void {
    this.message = message;
    setTimeout(() => {
      this.message.text = ''
    }, 5000)
  }
}
