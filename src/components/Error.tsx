import { useContext } from "react";
import styled from "styled-components";
import { ctx } from "../store/main";
import { ctxType } from "./App";

function Error() {
  const store = useContext(ctx) as ctxType;
  return (
    <Wrapper>
      <div>
        <p>Error</p>
        <p>Something went wrong</p>
      </div>
      <div>
        <p>Try again</p>
        <button
          onClick={() => {
            store.setError(false);
          }}
        >
          Close
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-block;
  padding: 11px;
  position: fixed;
  bottom: 5%;
  left: 50%;
  right: 50%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 1.1rem;
  background: linear-gradient(#d45659 60%, white 50% 100%);
  box-shadow: 2rem 2rem 2rem #00000018;
  transform: translateX(-50%);
  width: 500px;

  p {
    margin: 0;
  }
  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p:first-child {
      font-size: 2rem;
      font-weight: 300;
      border-bottom: 2px solid #d34f51;
    }
    color: white;
  }
  div:last-child {
    display: flex;
    justify-content: space-between;
  }

  button {
    border: 0;
    border-radius: 5px;
    color: white;
    background-color: #cf585a;
    padding: 0.5rem 2rem;
    font-family: "Open Sans";
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.2s;
  }

  button:active,
  button:hover {
    transform: scale(1.05);
  }
`;

export default Error;
