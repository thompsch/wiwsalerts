import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Card, CardBody } from "reactstrap";

Alert.propTypes = {
  alerts: PropTypes.object,
  setStatus: PropTypes.func,
  toggleStatus: PropTypes.func,
};
export default function Alert(props) {
  const { alerts, toggleStatus} = props;
  console.log(alerts);
  const Checkbox = alerts[0] ? CheckedIcon : UncheckedIcon;
  return (
    <Todo onClick={toggleStatus}>
      <Layout>
        <Checkbox />
        <Text>{alerts[0].task}</Text>
      </Layout>
    </Todo>
  );
}
const Todo = styled(Card)`
  margin: 4px auto;
  :first-of-type {
    margin-top: 0px;
  }
`;
const Layout = styled(CardBody)`
  display: flex;
  align-items: top;
  padding: 10px !important;
`;
const Text = styled.span`
  font-size: 18px;
  line-height: 24px;
  margin-left: 10px;
  max-width: calc(100% - 24px - 10px);
`;
