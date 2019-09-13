import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import AlertsList from "./AlertsList";
import Button from 'react-bootstrap/Button';

User.propTypes = {
  user: PropTypes.object,
  appSettings: PropTypes.object,
  actions: PropTypes.object
};

export default function User(props) {
  console.log('props', props)
  if (props == undefined) return( <Layout>
    <h1>loading...</h1>
    <h2></h2>
</Layout>);
  
  const { user, appSettings, actions } = props;

  if (user == {} || user.user == undefined) {
    console.log('again?', user.user)
    return (<Layout>
        <h1>loading...</h1>
        <h2></h2>
    </Layout>);
  }

  let children = user.user.children.map((item, key) =>
    <li key={key}>{item.name} (grade {item.grade})</li>
  );

  return (
    <Layout>
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
      <p>
      Phone for text messages: {user.phone}
      <br/>
      Child(ren):
      <ul>{children}</ul>
      </p>

      I would like to receive text messages for:
      <AlertsList {... props}/>
      <Button variant="outline-primary" onClick={()=>submitChanges()}>Save my Preferences</Button>
  </Layout>)

function submitChanges(){
  console.log('onclick',user)
}
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