// React
import React from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
// To-Do Components & Hooks
import User from "./User";
import NewUser from "./NewUser";
import { useStitchAuth } from "./StitchAuth";
import { Card, CardTitle } from "reactstrap";
import { getUser, getSettings } from "./dataReducer";

AlertApp.propTypes = {};

export default function AlertApp() { 
  const currentUser = useStitchAuth().currentUser;
  const {user, actions} = getUser(currentUser.id);
  const {appSettings} = getSettings();
  
  let bucket = {user, appSettings, actions};
  console.log('alertapp BUCKET', bucket)
  let newUser = (bucket.user._id != undefined)

      return (
        <ErrorBoundary>
          <Layout>
            <UserCard>
              <Title>
                <h1>Your WIWS Alert settings</h1>
              </Title>
              {newUser ?  <NewUser {... bucket} /> : <User {... bucket} /> }
            </UserCard>
          </Layout>
        </ErrorBoundary>
      );
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
