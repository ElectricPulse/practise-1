import React, { useContext } from "react";
import styled from "styled-components";
import { ctxType } from "./App";
import { ctx } from "../store/main";

type propsStyle = {
  type: "text" | "date" | "number" | "time";
};

interface propsInterface {
  ref: any;
  type: "text" | "date" | "number" | "time";
  name: string;
  value?: any;
}

const Input = React.forwardRef((props: propsInterface, ref) => {
  const store = useContext(ctx) as ctxType;
  return (
    <Wrapper type={props.type}>
      <label htmlFor={props.name}>{props.name}</label>
      <input
        defaultValue={props.value ? props.value : ""}
        ref={ref as any}
        name={props.name}
        type={props.type}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div<propsStyle>`
  display: flex;
  flex-direction: column;

  ${(props) => (props.type === "text" ? "" : "align-items: flex-start;")}

  input {
    padding: 0.6rem;
    border-radius: 5px;
    border: 1px solid #b9b9b9;
  }

  label {
    margin-bottom: 4px;
    font-weight: 700;
    font-size: 1rem;
    color: #4d4d4d;
  }
`;

export default Input;
