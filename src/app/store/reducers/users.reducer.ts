import { createReducer, on } from "@ngrx/store";
import { UserActions } from "../actions/users.actions";


export interface homeState {
    users: string[],
    count: number
}

const initialState: homeState = {
    users: [],
    count: 4
};


export const UsersReducer = createReducer(
    initialState,

    on(UserActions.add, (state: homeState, { user }) => ({
        ...state,
        users: [...state.users, user],
        count: state.count + 1
    })),

    on(UserActions.del, (state: homeState) => {
        console.log("API")
        return  ({
        ...state,
        users: state.users.slice(0, -1)
    })})
)