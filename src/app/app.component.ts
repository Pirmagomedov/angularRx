import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, map, tap } from 'rxjs';
import { Aa } from './a';
 
@Component({
  selector: 'app-root', 
  imports: [CommonModule, Aa],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})  
export class AppComponent {
  f = [1, 2, 3, 4, 5]
  int: number = 0
  bool: boolean = true
  count$ = new Subject<number>()
  constructor() {
    this.count$.pipe( 
      tap(console.log)
    )
      .subscribe(
        v => this.int = v
      )

    this.count$.pipe(
    )
      .subscribe(
        v => this.bool = v % 2 === 0
      )
  }

  a(target: MouseEvent) {
    console.log(target.target, this)
  }

  d() {
    this.count$.next(this.int + 1)
  }
}
