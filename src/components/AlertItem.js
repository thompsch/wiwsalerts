import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Card, CardBody } from "reactstrap";

AlertItem.propTypes = {
  item: PropTypes.object,
  updater: PropTypes.func
};

export default function AlertItem(props) {
  const { item, updater } = props;
  console.log("UPDATESETTINGS2", updater)
  const [checked, setChecked] = React.useState(item.subscribed);

  const Checkbox = checked ? CheckedIcon : UncheckedIcon;
  return (
    <Alert onClick={()=>setState(item)}>
      <Layout>
        <Checkbox />
        <Text>{item.type}</Text>
      </Layout>
    </Alert>
  );

  function setState(item) {
   item.subscribed = !item.subscribed;
   setChecked(item.subscribed);
   updater(item);
}
}

const Alert = styled(Card)`
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
