import {Component, OnInit} from '@angular/core';
import {MessageBusService} from "../../Services/MessageBus.service";
import {AuthorizationService} from "../../Services/authorization.service";
import {Login} from "../../models/Account/Login";
import {Registration} from "../../models/Account/Registration";

@Component({
  selector: 'left-panel',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAuthMode : boolean = false;
  isSingUp : boolean = false;
  inputType = 'password';

  loginForm : Login = new Login();
  registrationForm : Registration = new Registration();

  constructor(private MessageBusService: MessageBusService, private AuthorizationService: AuthorizationService) { }

  ngOnInit() {
    this.MessageBusService.navMode.subscribe(() => this.changeToNav());
    this.MessageBusService.authMode.subscribe(() => this.changeToAuth());
  }

  changeToNav() {
    this.isAuthMode = false;
  }
  changeToAuth() {
    this.isAuthMode = true;
  }

  async singIn() {
    await this.AuthorizationService.Login(this.loginForm)
  }

  async singUp() {
    await this.AuthorizationService.Registration(this.registrationForm);
  }
}
