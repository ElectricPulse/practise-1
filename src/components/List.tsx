import { useContext, useCallback } from "react";
import { ctx } from "../store/main";
import { useState } from "react";
import { ctxType, meetingType } from "./App";
import styled from "styled-components";
import Modal from "./Modal";

export default function List() {
  const store = useContext(ctx) as ctxType;
  const [modalVis, setModalVis] = useState(true);

  const mapMeetings = useCallback(
    () =>
      store.meetings.map((meeting: meetingType) => {
        if (!meeting?.title || !meeting?.id) {
          store.setError(true);
          return;
        }
        const { title, platform, date, participants, id, time, description } =
          meeting;
        return (
          <li key={id}>
            <p>{title}</p>
            <button onClick={() => setModalVis(true)}>Details</button>
            {modalVis && (
              <Modal
                {...{ participants, title, platform, date, time, description }}
                onClose={() => setModalVis(false)}
              />
            )}
          </li>
        );
      }),
    [store, modalVis]
  );

  return (
    <Wrapper>
      <ul>{store?.meetings ? mapMeetings() : store.setError(true)}</ul>
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
