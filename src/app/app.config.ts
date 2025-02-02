import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools"
import { homeFeature } from './store';
import { Actions, createEffect, provideEffects } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { AppService } from './app-services/app.service';
import { UserActions } from './store/actions/users.actions';


const aliEffect = createEffect(
  (actions$ = inject(Actions), actorsService = inject(AppService)) => {
    return actions$.pipe(
      exhaustMap(() => actorsService.fetchPocks().pipe(
        map(() => UserActions.del())
      ))
    )
  },
  { functional: true }
)


export const appConfig: ApplicationConfig = {
  providers: [provideStore({
        [homeFeature.name]: homeFeature.reducer
    }),
    provideEffects(aliEffect),
    provideStoreDevtools(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), provideEffects()]
};
