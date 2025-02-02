import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class AppService {
  private _users: string[] = []

  constructor() { }

  get users(): string[] {
    return this._users
  }

  set users(user: string) {
    this._users.push(user)
  }
}
