import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {MessageBusService} from "../../Services/MessageBus.service";

@Component({
  selector: 'left-panel',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAuthMode : boolean = false;
  isSingUp : boolean = false;

  constructor(private MessageBusService: MessageBusService) { }

  ngOnInit() {
    this.MessageBusService.navMode.subscribe(() => this.changeToNav());
    this.MessageBusService.authMode.subscribe(() => this.changeToAuth());
  }

  changeToNav() {
    console.log('Nav');
    this.isAuthMode = false;
  }
  changeToAuth() {
    console.log('Auth', this.isSingUp);
    this.isAuthMode = true;
  }

  onSingIn(f: NgForm) {
    console.log(f.value);
  }
}
