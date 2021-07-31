import { createSelector } from "reselect";

const getUser = (state) => state.user;

export const getCurrentUser = createSelector(
  [getUser],
  (user) => user.currentUser
);

export const checkIfUserIsSignerIn = createSelector(
  getUser,
  (user) => user.isSignedIn
);

// export const checkIfSidebarIsVisible = createSelector(
//   getUser,
//   (user) => user.sideBarVisible
// );
