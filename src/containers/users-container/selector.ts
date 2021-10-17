import { RootState } from "../../store/types";
import { createSelector } from "reselect";
import { UsersState } from "../../store/slices";

const getUsersState = (state: RootState): UsersState => state.users;

export const selectUsersIds = createSelector<RootState, UsersState, number[]>(
  getUsersState,
  (usersState): number[] => usersState.ids
);

export const selectIsLoadingUsers = createSelector<
  RootState,
  UsersState,
  boolean
>(getUsersState, (usersState): boolean => usersState.loading);
