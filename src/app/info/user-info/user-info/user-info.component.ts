import { Component, Inject, Injectable } from '@angular/core';
import { AppService } from '../../../app-services/app.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { homeCountSelector } from '../../../store/selectors/users.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  public ali$!: Observable<number>

  constructor(readonly appServise: AppService, readonly store: Store) {
    this.ali$ = store.select(homeCountSelector)
  }

  add() {
    this.appServise.addUser("child")
  }

  print() {
    console.log(this.appServise.users)
  }

}
