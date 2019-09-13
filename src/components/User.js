import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import AlertsList from "./AlertsList";
import Button from 'react-bootstrap/Button';

User.propTypes = {
  user: PropTypes.object,
  updater: PropTypes.func
};

export default function User(props) {
  
  if (props == undefined) return(<Layout>
    <h1>loading...</h1>
    <h2></h2>
    </Layout>);

  const {user} = props;
  const onClick = props.updater;
const alertUpdater = ()=>updateAlertSettings();

  console.log('User.js user', user, onClick)

  if (user._id == undefined) {
    console.log('again?', user)
    return (<Layout>
        <h1>loading...</h1>
        <h2></h2>
    </Layout>);
  }

  let children = user.children.map((item, key) =>
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
      <AlertsList updateAlerts={()=>alertUpdater(alert)} {... props}/>
      <Button variant="outline-primary" onClick={()=>onClick(user)}>Save my Preferences</Button>
  </Layout>)

function updateAlertSettings(alert){
  console.log('***updateAlertSettings', user);
  console.log(user.alerts, alert);
  onClick(user);
  //TODO: persist to Stitch
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