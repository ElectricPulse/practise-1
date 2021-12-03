import { useContext } from "react";
import styled from "styled-components";
import { ctx } from "../store/main";
import { ctxType } from "./App";

function Error() {
  const store = useContext(ctx) as ctxType;
  return (
    <Wrapper>
      <div className="overview">
        <p className="primaryText">Error</p>
        <p className="subText">Something went wrong</p>
      </div>
      <div className="details">
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
  padding: 11px;
  position: fixed;
  bottom: 5%;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: linear-gradient(#d45659 60%, white 50% 100%);
  box-shadow: 2rem 2rem 2rem #00000018;
  width: 500px;

  .primaryText {
    font-size: 2rem;
    font-weight: 300;
    border-bottom: 2px solid #d34f51;
  }

  .overview {
    display: flex;
    flex-direction: column;
    color: white;
    gap: 10px;
  }

  .details {
    display: flex;
    justify-content: space-between;
  }

  button {
    color: white;
    background-color: #cf585a;
    padding: 0.5rem 2rem;
    font-size: 1rem;
    transition: all 0.2s;
  }

  button:active,
  button:hover {
    transform: scale(1.05);
  }
`;

export default Error;
