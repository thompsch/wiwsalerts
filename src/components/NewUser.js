import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

NewUser.propTypes = {
  bucket: PropTypes.object,
};

export default function NewUser(props) {
  
  const { bucket } = props;

  //console.log('NewUser', bucket.user)
  if (bucket ==null || bucket.alertTypes == undefined){
     return <Layout>loading...</Layout>
  }
  let alertTypes = bucket.alert_types.map((item, key) =>
      <li key={key}>{item}</li>
    );

    return (
      <Layout>
        <h2>Welcome!</h2>
        <p>
        It looks like you're new here! Please provide the following for us:
         name
         phone
         children...
         
       </p>
      Please send me text (SMS) messages for the following:
      <ul>{alertTypes}</ul>

    </Layout>)
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
