import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Button } from "reactstrap";
import TodoInput from "./TodoInput";

TodoControls.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.object,
};
export default function TodoControls(props) {
  const { items, actions } = props;
  const [inputText, setInputText] = useState("");
  const hasCheckedItems = items;
  const handleInput = e => setInputText(e.target.value);
  const handleAddTodo = () => {
    if (inputText) {
      actions.addTodo(inputText);
      setInputText("");
    }
  };
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };
  //const allTodosAreCompleted = items.every(item => item.checked === true);
  //const someTodosAreCompleted = items.every(item => item.checked === true);
  return (
    <Layout>
      <TodoInput
        value={inputText}
        addTodo={handleAddTodo}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
      />
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
`;

