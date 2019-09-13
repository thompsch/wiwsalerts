import React from "react";
import { userCollection, appSettingsCollection } from "../stitch";

const userReducer = (state, { type, payload }) => {
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
    case "toggleAlertStatus": {
      const updateStatus = alert => {
        const isThisTodo = alert._id === payload.id;
        return isThisTodo ? { ...alert, checked: !alert.checked } : alert;
      };
      return {
        ...state,
        alerts: state.alerts.map(updateStatus),
      };
    }
  }
}

export function getUser(userId) {
  const [state, dispatch] = React.useReducer(userReducer, { user: {} });
  
  const loadUser = async () => {
    
    console.log('fetching from Stitch')
    await userCollection.findOne({"oauth_id":userId}).then(async user=>{
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
  const [state, dispatch] = React.useReducer(userReducer, { appSettings: {} });

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
