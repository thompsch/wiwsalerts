// React
import React from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
// To-Do Components & Hooks
import User from "./User";
import { useStitchAuth } from "./StitchAuth";
import { Card, CardTitle } from "reactstrap";
import { useUser } from "./userReducer";

AlertApp.propTypes = {};

export default function AlertApp(props) { 
  const { currentUser } = useStitchAuth();

  const {user} = useUser(currentUser.id);

  console.log('alertapp', currentUser, user)


 //console.log(appSettings)
  
      return (
        <ErrorBoundary>
          <Layout>
            <UserCard>
              <Title>
                <h1>Your WIWS Alert settings</h1>
              </Title>
              <User {... user} />
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
