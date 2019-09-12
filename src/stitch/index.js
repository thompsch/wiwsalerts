import { app } from "./app";
import { userCollection, appSettingsCollection } from "./mongodb";
import {
  logoutCurrentUser,
  hasLoggedInUser,
  getCurrentUser,
} from "./authentication";

export { app, userCollection, appSettingsCollection };
export { logoutCurrentUser, hasLoggedInUser, getCurrentUser };
