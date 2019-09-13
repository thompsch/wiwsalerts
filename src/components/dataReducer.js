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
  const [state, dispatch] = React.useReducer(dataReducer, { user: {} });
  getSettings();

  const loadUser = async () => {
    await userCollection.findOne({"oauth_id":userId}).then(async user=>{
      dispatch({ type: "setUser", payload: { user } });
    });
  };

  const toggleAlertStatus = async alertId => {
    /*const todo = state.alerts.find(t => t._id === alert._id);
    await items.updateOne(
      { _id: todoId },
      { $set: { checked: !todo.currentStatus } },
    );
    dispatch({ type: "toggleTodoStatus", payload: { id: todoId } });*/
  };

  React.useEffect(() => {
    loadUser(); 
  }, []);
  return {
    user: state.user,
    actions: {
      toggleAlertStatus
    }
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
