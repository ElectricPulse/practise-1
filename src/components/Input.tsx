import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import capitalize from '../utils/capitalize'

type inputTypes = "text" | "date" | "number" | "time";

interface propsInterface {
  type: inputTypes,
  name: string;
  value?: any;
  refs: React.MutableRefObject<{
    [key: string]: React.RefObject<HTMLInputElement>;
  }>;
}

const Input = (props: propsInterface) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      props.refs.current[props.name] = ref;
    }
  }, [props.refs, props.name]);

  return (
    <Wrapper>
      <label htmlFor={props.name}>{capitalize(props.name)}</label>
      <input
        required
        defaultValue={props.value || undefined}
        ref={ref}
        name={props.name}
        type={props.type}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 0.6rem;
    border-radius: 5px;
    border: 1px solid #b9b9b9;

    &[type="number"],
    &[type="time"],
    &[type="date"] {
      align-self: flex-start;
    }
  }

  label {
    margin-bottom: 4px;
    font-weight: 700;
    font-size: 1rem;
    color: #4d4d4d;
  }
`;

export default Input;
