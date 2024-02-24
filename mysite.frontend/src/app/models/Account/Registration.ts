export class Registration {
  get Name(): string {
    return this._Name;
  }

  set Name(value: string) {
    this._Name = value;
  }
  set Password(value: string) {
    this._Password = value;
  }
  set Email(value: string) {
    this._Email = value;
  }
  get Password(): string {
    return this._Password;
  }
  get Email(): string {
    return this._Email;
  }

  private _Name : string = '';
  private _Email : string = '';
  private _Password : string = '';

  constructor() {
  }
}
