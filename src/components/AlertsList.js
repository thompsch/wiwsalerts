import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import AlertItem from "./AlertItem";

AlertsList.propTypes = {
  user: PropTypes.object,
  updateAlerts: PropTypes.func,
};

export default function AlertsList(props) {
  const { user, updateAlerts } = props;
  let alerts = user.alerts;
  return (
      <List>
        {alerts.map(item => (
          <AlertItem
            key={item.type}
            item={item}
            updater={()=>updateAlerts(alert)}
          />
        ))}
      </List>
  );
}
const List = styled.ul`
  padding: 0;
  margin-top: 10px;
  width: 450px;
`;
