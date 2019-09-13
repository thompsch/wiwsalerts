import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import AlertItem from "./AlertItem";

AlertsList.propTypes = {
  alerts: PropTypes.array,
  actions: PropTypes.object,
};
export default function AlertsList(props) {
  const { user, actions } = props;
  let alerts = user.user.alerts;
  return (
      <List>
        {alerts.map(item => (
          <AlertItem
            key={item.type}
            item={item}
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
