import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';


export interface poks {
  name: string,
  id: number
}

@Injectable({
  providedIn: "root"
})
export class AppService {
  private _users: string[] = []
  private poks: poks[] = []

  constructor(readonly http: HttpClient) { }

  fetchPocks() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?limit=22")
  }

  setPocks(newPoks: poks[]): void {
    this.poks = newPoks
  }

  getPocks(): poks[] {
    return this.poks
  }

  get users(): string[] {
    return this._users
  }

  addUser(user: string): void {
    this._users.push(user)
  }
}
