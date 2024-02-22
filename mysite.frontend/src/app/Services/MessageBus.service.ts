import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  navMode = new EventEmitter();
  authMode = new EventEmitter();

  NavModeState() {
    this.navMode.emit();
  }
  AuthModeState() {
    this.authMode.emit();
  }
}
