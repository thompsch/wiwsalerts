// React
import React from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
// To-Do Components & Hooks
import User from "./User";
import NewUser from "./NewUser";
import { useStitchAuth } from "./StitchAuth";
import { Card, CardTitle } from "reactstrap";
import { getUser, getSettings } from "./userReducer";

AlertApp.propTypes = {};

export default function AlertApp() { 
  const currentUser = useStitchAuth().currentUser;
  const {user} = getUser(currentUser.id);
  const {appSettings} = getSettings();

  const [state, setState] = React.useState({
    user: user,
    appSettings: appSettings
  });

  
  console.log('AlertApp', user.user, state.user)

  if (user.user != undefined && state.user._id == undefined) {
    setState(user, user)
  } 
  let newUser = (user && user.user && user.user._id != undefined) ? false : true;
console.log('NEWUSER?', newUser)
      return (
        <ErrorBoundary>
          <Layout>
            <UserCard>
              <Title>
                <h1>Your WIWS Alert settings</h1>
              </Title>
              {newUser ?  <NewUser {... state} /> : <User updater={updateUserSettings} {... state} /> }
            </UserCard>
          </Layout>
        </ErrorBoundary>
      );
}

function updateUserSettings(user){
  console.log('updateUserSettings', user);
  //TODO: persist to Stitch
}

const Layout = styled.div`
  background: #eeeeee;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserCard = styled(Card)`
  max-width: 600px;
  align-items: center;
  width: 100%;
`;
const Title = styled(CardTitle)`
  margin: 0;
  h1 {
    padding: 20px;
    margin: 0;
  }
`;
