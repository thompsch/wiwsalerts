import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {
  hasLoggedInUser,
  loginAnonymous,
  loginFacebook, 
  loginGoogle, 
  logoutCurrentUser,
  getCurrentUser,
  addAuthenticationListener,
  removeAuthenticationListener,
  handleOAuthRedirects, 
} from "./../stitch/authentication";

// Create a React Context that lets us expose and access auth state
// without passing props through many levels of the component tree
const StitchAuthContext = React.createContext();

// Create a React Hook that lets us get data from our auth context
export function useStitchAuth() {

  const context = React.useContext(StitchAuthContext);
  if (!context) {
    throw new Error(`useStitchAuth must be used within a StitchAuthProvider`);
  }
  return context;
} 

// Create a component that controls auth state and exposes it via
// the React Context we created.
export function StitchAuthProvider(props) {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: hasLoggedInUser(),
    currentUser: getCurrentUser(),
  });

  useEffect(() => {
    const authListener = {
      onUserLoggedIn: (auth, loggedInUser) => {
        if (loggedInUser) {
          setAuthState(authState => ({
            ...authState,
            isLoggedIn: true,
            currentUser: loggedInUser,
          }));
        }
      },
      onUserLoggedOut: (auth, loggedOutUser) => {
        setAuthState(authState => ({
          ...authState,
          isLoggedIn: false,
          currentUser: null,
        }));
      }
    };
    addAuthenticationListener(authListener);
    handleOAuthRedirects(); 
    setAuthState(state => ({ ...state}));
    return () => {
      removeAuthenticationListener(authListener);
    };
  }, []);

  const handleLogin = async (provider) => {
    if (!authState.isLoggedIn) {
      switch(provider) {
        case "anonymous": return loginAnonymous()
        case "facebook": return loginFacebook()
        case "google": return loginGoogle()
        default: {}
      }
    }
  }
  
  const handleLogout = async () => {
    if (authState.isLoggedIn) {
      await logoutCurrentUser();
      setAuthState({
        ...authState,
        isLoggedIn: false,
        currentUser: null,
      });
    }
  }

  // We useMemo to improve performance by eliminating some re-renders
  const authInfo = React.useMemo(() => {
    const { isLoggedIn, currentUser } = authState;
    const value = {
      isLoggedIn,
      currentUser,
      actions: {
        handleLogin,
        handleLogout,
      },
    };
    return value;
  }, [authState]); 

  return (
    <StitchAuthContext.Provider value={authInfo}>
      {props.children}
    </StitchAuthContext.Provider>
  );
}

StitchAuthProvider.propTypes = {
  children: PropTypes.element,
};
