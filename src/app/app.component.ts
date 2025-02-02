import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService, poks } from './app-services/app.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { debounceTime, delay, first, fromEvent, interval, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from './store/actions/users.actions';
import { homeCountSelector } from './store/selectors/users.selectors';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected poks: poks[] = []
  @ViewChild("par") par!: ElementRef

  private ofX!: number
  private ofY!: number
  private touch: boolean = false
  public cubs: string[] = ["1", "2", "3", "ali", "top", "4", "5", "6", "1", "2", "3", "ali", "top", "4", "5", "6"]
  public ali$!: Observable<number>

  constructor(readonly appServise: AppService, readonly store: Store) { }

  ngOnInit(): void {
    this.ali$ = this.store.select(homeCountSelector)

    this.appServise.fetchPocks().subscribe((response: any) => {
      this.appServise.setPocks(response?.results)
      this.poks = this.appServise.getPocks()
    })
  }

  ngAfterViewInit(): void {
    for (let ob of this.par.nativeElement.children) {

      const b = fromEvent(ob, "touchend")
      const c = fromEvent(ob, "touchstart")

      b.pipe(tap(_ => this.touch = false), debounceTime(100)).subscribe(_ => !this.touch &&
        ((document.querySelector("body") as any).style.overflowY = "scroll"))

      const a = fromEvent(this.par.nativeElement, "touchmove").pipe(takeUntil(b))

      c.subscribe((v: any) => {
        this.touch = true;
        (document.querySelector("body") as any).style.overflowY = "hidden"
        v.target.style.zIndex = Date.now() - 1738100000000
        const rect = v.target.getBoundingClientRect()
        this.ofX = v.touches[0].clientX - window.pageXOffset - rect.left
        this.ofY = v.touches[0].clientY - window.pageYOffset - rect.top
      })

      c.pipe(switchMap(() => interval(1500).pipe(first(), takeUntil(b), takeUntil(a))))
        .subscribe(_ => console.log("Рил хочешь удалить?"))

      c.pipe(switchMap(() => a), delay(44)).subscribe((v: any) => {
        ob.style.left = `${v.touches[0].clientX - this.ofX - 9}px`
        ob.style.top = `${v.touches[0].clientY - this.ofY - 9}px`
      })
    }
  }

  add() {
    this.store.dispatch(UserActions.add({ user: "Alishka" }))
    this.store.dispatch(UserActions.del())
    this.appServise.addUser("par")
  }

  print() {
    this.store.dispatch(UserActions.del())
  }
}
