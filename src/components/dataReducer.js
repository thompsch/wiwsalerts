import React from "react";
import { userCollection, appSettingsCollection } from "../stitch";

const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "setUser": {
      return {
        ...state,
        user: payload || {},
      };
    }
    case "setSettings": {
      return {
        ...state,
        appSettings: payload || {},
      };
    }
  }
}

export function getUser(userId) {
  const [state, dispatch] = React.useReducer(dataReducer, { user: {} });

  const loadUser = async () => {
    await userCollection.findOne({"oauth_id":userId}).then(async user=>{
      console.log('ohhai', user)
      dispatch({ type: "setUser", payload: { user } });
    });
  };

  React.useEffect(() => {
    loadUser(); 
  }, []);
  return {
    user: state.user
  };
}

export function getSettings() {
  const [state, dispatch] = React.useReducer(dataReducer, { appSettings: {} });

  const loadSettings = async () => {
    await appSettingsCollection.findOne({}).then(async appSettings => {
      dispatch({ type: "setSettings", payload: { appSettings } });
    });
  };

  React.useEffect(() => {
    loadSettings(); 
  }, []);
  return {
    appSettings: state.appSettings
  };
}
