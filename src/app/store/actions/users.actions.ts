import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const UserActions = createActionGroup({
  source: "Users",
  events: {
    add: props<{ user: string }>(),
    del: emptyProps()
  }
})