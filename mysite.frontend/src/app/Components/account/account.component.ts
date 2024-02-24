import { Component } from '@angular/core';
import {MessageBusService} from "../../Services/MessageBus.service";

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isUserLogin : boolean = false;
  isAuthMode : boolean = false;
  constructor(private MessageBusService: MessageBusService) { }
  AccountClick() {
    this.isAuthMode = !this.isAuthMode;
    if(this.isAuthMode)
      this.MessageBusService.AuthModeState();
    else
      this.MessageBusService.NavModeState();
  }
}
