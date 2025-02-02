import { createSelector, createFeatureSelector } from "@ngrx/store"
import { homeState } from "../reducers/users.reducer"


export const HOME_FEATURE: string = "home"

const homeSelector = createFeatureSelector<homeState>(HOME_FEATURE)
export const homeCountSelector = createSelector(homeSelector, home => home.count)