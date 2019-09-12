import React from "react";
import { userCollection } from "../stitch";

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "setUser": {
      return {
        ...state,
        user: payload || {},
      };
    }
  }
}

export function useUser(userId) {
  const [state, dispatch] = React.useReducer(userReducer, { user: {} });

  const loadUser = async () => {
    await userCollection.findOne({"oauth_id":userId}).then(user=>{
      console.log('ohhai', user)
      dispatch({ type: "setUser", payload: { user } });
    });
  };

  React.useEffect(() => {
    loadUser(); 
  }, []);
  return {
    user: state.user,
  };
}
