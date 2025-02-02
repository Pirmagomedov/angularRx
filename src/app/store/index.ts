import { createFeature } from "@ngrx/store";
import { UsersReducer } from "./reducers/users.reducer";
import { HOME_FEATURE } from "./selectors/users.selectors";


export const homeFeature = createFeature({
  name: HOME_FEATURE,
  reducer: UsersReducer
})