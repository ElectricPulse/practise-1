import React, { useContext, useCallback } from "react";
import { ctx } from "../store/main";
import { useState } from "react";
import { ctxType } from "./App";
import styled from "styled-components";
import Modal from "./Modal";

export default function List() {
  const store = useContext(ctx) as ctxType;
  const [modalVis, setModalVis] = useState(false);
  const indexMeetings = Object.entries(store.meetings);

  const mapMeetings = useCallback(
    () =>
      indexMeetings.map((element: any[]) => {
        const id = element[0];
        const meeting = element[1];

        if (!meeting?.title || !id) {
          store.setError(true);
          return;
        }

        return (
          <li key={id}>
            <p>{meeting.title}</p>
            <button onClick={() => setModalVis(true)}>Details</button>
            <button onClick={store.setEditing.bind(null, { ...meeting, id })}>
              Edit
            </button>
            {modalVis && (
              <Modal {...meeting} onClose={() => setModalVis(false)} />
            )}
          </li>
        );
      }),
    [store, modalVis, indexMeetings]
  );

  return (
    <Wrapper>
      <ul>
        {((): any => {
          if (store?.meetings) {
            return mapMeetings();
          }

          store.setError(true);
          return <div></div>;
        })()}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 10px;
  background-color: #fafafa;
  display: block;
  margin-inline: auto;
  width: 40%;
  height: 100vh;
  font-family: "Open Sans";
  font-size: 1.4rem;
  font-weight: 400;
  ul {
    list-style: none;
  }
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #e6e6e6;
    align-items: center;
    button {
      font-weight: 600;
      font-size: 0.8rem;
      box-shadow: 0.5rem 0.5rem 1rem #00000024;
      border: none;
      border-radius: 5px;
      width: 6rem;
      height: 3rem;
      margin-right: 20px;
    }
    button:hover {
      transform: scale(1.1);
    }
  }
`;
